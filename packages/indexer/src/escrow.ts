import { ponder, type Context, type Event } from "ponder:registry";
import * as schema from "ponder:schema";
import { concatHex, isHash, numberToHex, parseUnits, stringToHex, zeroAddress, type Hex } from "viem";
import { eventOrderId, EventType } from "@vitals/utils/events";
import { ids, orderId as orderIdUtils } from "@vitals/utils/ids";
import type { StatAction } from "@vitals/utils/stats";
import type { StatusMutatingAction } from "@vitals/utils/deposit";
import { interval, TimeResolutionKey } from "@vitals/utils";
import { upsertBlock, upsertTransaction, type DepositStatus, type LogStatsInputs, orderId } from "./utils";

const truncateTimestamp = (timestamp: bigint, type: TimeResolutionKey) => {
  if (type === 'hour' || type === 'day') {
    const factoredInterval = BigInt(interval[type]) / BigInt(interval.second)
    return timestamp - (timestamp % factoredInterval)
  }
  // because not all months are the same length, we have to form a date object and use that timestamp
  const date = new Date(Number(timestamp * 1000n))
  date.setHours(0, 0, 0, 0)
  date.setDate(1)
  return BigInt(date.getTime() / 1000)
}

const logStat = async (context: Context, { timestamp, type, action, amount, currency, token, verifier }: Omit<LogStatsInputs, 'chainId'> & { action: StatAction }) => {
  const logStatsIdInputs = { type, action, currency, token, verifier } as const
  // const factoredInterval = BigInt(interval[type]) / BigInt(interval.second)
  const truncatedTimestamp = truncateTimestamp(timestamp, type) // timestamp - (timestamp % factoredInterval)
  const oId = orderId.stat(context, { timestamp: truncatedTimestamp, ...logStatsIdInputs })
  // const previousAccumulatedStatId = orderId.stat(context, {
  //   timestamp: truncatedTimestamp - factoredInterval,
  //   type,
  //   action,
  //   currency,
  //   token,
  //   verifier,
  // })
  // const previousStat = await context.db.find(schema.accumulatedStat, {
  //   orderId: previousAccumulatedStatId,
  // })
  // let accumulatedAmount = 0n
  // if (previousStat) {
  //   // amount = previousStat.amount + amount
  //   accumulatedAmount = previousStat.amount
  // }
  // accumulatedAmount += amount
  const chainId = BigInt(context.chain.id)
  console.log('truncatedTimestamp %o', new Date(Number(truncatedTimestamp * 1000n)).toISOString())
  const insertStat = context.db.insert(schema.stat).values({
    orderId: oId,
    amount,
    timestamp: truncatedTimestamp,
    chainId,
    ...logStatsIdInputs,
  }).onConflictDoUpdate((row) => ({
    amount: row.amount + amount,
  }))
  // const insertAccumulatedStat = context.db.insert(schema.accumulatedStat).values({
  //   orderId: oId,
  //   amount: accumulatedAmount,
  //   timestamp: truncatedTimestamp,
  //   chainId,
  //   ...logStatsIdInputs,
  // }).onConflictDoUpdate((row) => ({
  //   amount: row.amount + amount,
  // }))
  await Promise.all([
    insertStat,
    // insertAccumulatedStat,
  ])
}

const logStats = async (context: Context, inputs: Omit<LogStatsInputs, "type" | "chainId">) => {
  if (inputs.amount < 0n) {
    console.error("Negative amount detected in logStats:", inputs)
  }
  await Promise.all([
    logStat(context, { type: 'hour', ...inputs }),
    logStat(context, { type: 'day', ...inputs }),
    logStat(context, { type: 'month', ...inputs }),
  ])
}

const getDeposit = async (depositId: Hex, context: Context) => {
  const deposit = await context.db.find(schema.deposit, {
    depositId,
  })
  if (!deposit) {
    throw new Error("Deposit not found")
  }
  return deposit
}

const getDepositWithRate = async ({
  depositId: dId,
  currency,
  verifier,
}: {
  depositId: bigint,
  currency: Hex,
  verifier: Hex,
}, context: Context) => {
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: dId })
  const [deposit, depositCurrencyAdded] = await Promise.all([
    getDeposit(depositId, context),
    context.db.find(schema.depositCurrencyAdded, {
      depositCurrencyAddedId: ids.depositCurrencyAdded({ depositId, currency, verifier }),
    }),
  ])
  const depositConversionRateUpdated = await context.db.find(schema.depositConversionRateUpdated, {
    depositConversionRateUpdatedId: depositCurrencyAdded!.currentDepositConversionRateUpdatedId,
  })
  return { deposit, depositCurrencyAdded, depositConversionRateUpdated }
}

export const getDepositFromIntent = async ({
  depositId,
  intentHash,
}: {
  depositId: Hex,
  intentHash: Hex,
}, context: Context) => {
  const [deposit, intentSignaled] = await Promise.all([
    getDeposit(depositId, context),
    context.db.find(schema.intentSignaled, {
      intentHash,
    }),
  ])
  if (!intentSignaled) {
    throw new Error("Intent not found")
  }
  const depositCurrencyAddedId = intentSignaled.depositCurrencyAddedId
  const [depositCurrencyAdded, depositConversionRateUpdated] = await Promise.all([
    context.db.find(schema.depositCurrencyAdded, {
      depositCurrencyAddedId,
    }),
    context.db.find(schema.depositConversionRateUpdated, {
      depositConversionRateUpdatedId: intentSignaled!.depositConversionRateUpdatedId,
    }),
  ])
  if (!depositCurrencyAdded) {
    throw new Error("Rate track not found")
  }
  if (!depositConversionRateUpdated) {
    throw new Error("Rate not found")
  }
  return { deposit, intentSignaled, depositCurrencyAdded, depositConversionRateUpdated }
}

ponder.on("Escrow:DepositReceived", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'deposit', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const participantId = ids.participant({ chainId: context.chain.id, address: event.args.depositor })
  const [min, max] = event.args.intentAmountRange
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.deposit).values({
      depositId,
      orderId: oId,
      token: event.args.token,
      chainId: BigInt(context.chain.id),
      participantId,
      logId,
      deposited: event.args.amount,
      remaining: event.args.amount,
      minAmount: min,
      maxAmount: max,
      status: getDepositStatus('deposit', {
        remaining: event.args.amount,
        minAmount: min,
        status: 'active',
      }),
      transactionId: transactionOrderId,
      depositConversionRateCurrencies: [],
      depositConversionRateVerifiers: [],
    }),
    context.db.insert(schema.participant).values({
      participantId,
      chainId: BigInt(context.chain.id),
      address: event.args.depositor,
    }).onConflictDoNothing(),
    context.db.insert(schema.depositReceived).values({
      orderId: oId,
      logId,
      token: event.args.token,
      participantId,
      transactionId: transactionOrderId,
      depositId,
      amount: event.args.amount,
      actionId: logId,
    }),
    context.db.insert(schema.depositDelta).values({
      orderId: oId,
      logId,
      depositId,
      amountBefore: 0n,
      delta: event.args.amount,
      amountAfter: event.args.amount,
    }),
    context.db.insert(schema.action).values({
      orderId: oId,
      logId,
      transactionId: transactionOrderId,
      participantId,
      depositId,
    }),
    logStats(context, {
      timestamp: event.block.timestamp,
      action: 'deposit',
      amount: event.args.amount,
      currency: null,
      token: event.args.token,
      verifier: zeroAddress,
    }),
  ])
});

ponder.on("Escrow:DepositCurrencyAdded", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'currency_added', event, context })
  const oIdRate = orderId.order({ name: 'rate_update', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  const conversionRateInputs = {
    chainId: context.chain.id,
    currency: event.args.currency,
    verifier: event.args.verifier,
    depositId,
  } as const
  const changeId = 0
  const depositVerifierAddedId = ids.depositVerifierAdded(conversionRateInputs)
  const depositCurrencyAddedId = ids.depositCurrencyAdded(conversionRateInputs)
  const depositConversionRateUpdatedId = ids.depositConversionRateUpdated({ ...conversionRateInputs, changeId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDeposit(depositId, context).then(async (deposit) => {
      await Promise.all([
        context.db.update(schema.deposit, {
          depositId,
        }).set({
          depositConversionRateCurrencies: [...deposit.depositConversionRateCurrencies, event.args.currency],
        }),
        context.db.insert(schema.depositConversionRateUpdated).values({
          depositConversionRateUpdatedId,
          depositCurrencyAddedId,
          depositVerifierAddedId,
          value: event.args.conversionRate,
          changeId,
          orderId: oIdRate,
          logId,
          transactionId: transactionOrderId,
          ...conversionRateInputs,
          active: true,
        }),
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          participantId: deposit.participantId,
          depositId,
        }),
        context.db.insert(schema.depositCurrencyAdded).values({
          orderId: oId,
          logId,
          currency: event.args.currency,
          depositCurrencyAddedId,
          depositVerifierAddedId,
          currentDepositConversionRateUpdatedId: depositConversionRateUpdatedId,
          transactionId: transactionOrderId,
          depositId: orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId }),
          verifier: event.args.verifier,
          participantId: deposit.participantId,
        }),
      ])
    })
  ])
})

const getPayeeDetails = async ({
  depositId,
  verifier,
  payeeDetailsHash,
  context,
  escrow,
}: {
  depositId: bigint,
  verifier: Hex,
  payeeDetailsHash: Hex,
  context: Context,
  escrow: Hex,
}) => {
  const payeeDetails = await context.db.find(schema.payeeDetails, {
    payeeDetailsId: payeeDetailsHash,
  })
  if (!payeeDetails) {
    const depositVerifierData = await context.client.readContract({
      abi: context.contracts.Escrow.abi,
      address: escrow,
      functionName: 'depositVerifierData',
      args: [depositId, verifier],
    })
    let [intentGatingService, payeeDetails, data] = depositVerifierData as [Hex, string, Hex]
    if (!isHash(payeeDetails)) {
      payeeDetails = stringToHex(payeeDetails)
    }
    return {
      intentGatingService,
      payeeDetails: payeeDetails as Hex,
      data,
    }
  }
  return {
    // return a read only version of the payee details
    ...payeeDetails,
  }
}
ponder.on('Escrow:DepositVerifierAdded', async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'verifier_added', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  const depositVerifierAddedId = ids.depositVerifierAdded({
    depositId,
    verifier: event.args.verifier,
  })
  const participantId = ids.participant({ chainId: context.chain.id, address: event.args.verifier })
  const depositVerifierData = await getPayeeDetails({
    depositId: event.args.depositId,
    verifier: event.args.verifier,
    payeeDetailsHash: event.args.payeeDetailsHash,
    context,
    escrow: event.log.address,
  })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.depositVerifierAdded).values({
      orderId: oId,
      logId,
      depositId,
      verifier: event.args.verifier,
      intentGatingService: event.args.intentGatingService,
      payeeDetailsHash: event.args.payeeDetailsHash,
      transactionId: transactionOrderId,
      participantId,
      depositVerifierAddedId,
    }),
    context.db.insert(schema.payeeDetails).values({
      payeeDetailsId: event.args.payeeDetailsHash,
      ...depositVerifierData,
    }).onConflictDoNothing(),
    context.db.update(schema.deposit, {
      depositId,
    }).set((deposit) => ({
      depositConversionRateVerifiers: [...deposit.depositConversionRateVerifiers, event.args.verifier],
    })),
  ])
})

ponder.on("Escrow:DepositWithdrawn", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'withdrawal', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const participantId = ids.participant({ chainId: context.chain.id, address: event.args.depositor })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDeposit(depositId, context).then((deposit) => {
      return Promise.all([
        logStats(context, {
          timestamp: event.block.timestamp,
          action: 'withdrawal',
          amount: event.args.amount,
          currency: null,
          token: deposit.token,
          verifier: zeroAddress,
        }),
        context.db.update(schema.deposit, {
          depositId,
        }).set({
          remaining: deposit.remaining - event.args.amount,
          status: getDepositStatus('withdrawal', deposit),
        }),
        context.db.insert(schema.depositWithdrawn).values({
          orderId: oId,
          logId,
          participantId,
          actionId: logId,
          amount: event.args.amount,
          transactionId: transactionOrderId,
          depositId,
        }),
        context.db.insert(schema.depositDelta).values({
          orderId: oId,
          logId,
          depositId,
          amountBefore: deposit.remaining,
          delta: event.args.amount,
          amountAfter: 0n,
        }),
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          participantId,
          depositId,
        }),
      ])
    }),
  ])
});

ponder.on("Escrow:DepositClosed", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'closed', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const participantId = ids.participant({ chainId: context.chain.id, address: event.args.depositor })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.update(schema.deposit, {
      depositId,
    }).set((current) => ({
      status: getDepositStatus('closed', current),
    })),
    context.db.insert(schema.depositClosed).values({
      orderId: oId,
      logId,
      participantId,
      transactionId: transactionOrderId,
      depositId,
    }),
    context.db.insert(schema.action).values({
      orderId: oId,
      logId,
      transactionId: transactionOrderId,
      participantId,
      depositId,
    }),
  ])
});

ponder.on("Escrow:DepositConversionRateUpdated", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'rate_update', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDepositWithRate({
      depositId: event.args.depositId,
      currency: event.args.currency,
      verifier: event.args.verifier,
    }, context).then(async ({ deposit, depositCurrencyAdded, depositConversionRateUpdated }) => {
      // Find the current conversion rate for this currency/verifier combination

      const changeId = depositConversionRateUpdated!.changeId + 1
      const newDepositConversionRateUpdatedId = ids.depositConversionRateUpdated({
        currency: event.args.currency,
        verifier: event.args.verifier,
        depositId,
        changeId,
      })

      return Promise.all([
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          participantId: deposit.participantId,
          depositId,
        }),
        context.db.update(schema.depositCurrencyAdded, {
          depositCurrencyAddedId: depositCurrencyAdded!.depositCurrencyAddedId,
        }).set({
          currentDepositConversionRateUpdatedId: newDepositConversionRateUpdatedId,
        }),
        context.db.update(schema.depositConversionRateUpdated, {
          depositConversionRateUpdatedId: depositConversionRateUpdated!.depositConversionRateUpdatedId,
        }).set({
          active: false,
        }),
        context.db.insert(schema.depositConversionRateUpdated).values({
          orderId: oId,
          logId,
          depositConversionRateUpdatedId: newDepositConversionRateUpdatedId,
          depositCurrencyAddedId: depositCurrencyAdded!.depositCurrencyAddedId,
          depositVerifierAddedId: depositCurrencyAdded!.depositVerifierAddedId,
          currency: event.args.currency,
          verifier: event.args.verifier,
          depositId,
          value: event.args.newConversionRate,
          transactionId: transactionOrderId,
          changeId,
          active: true,
        }),
      ])
    })
  ])
})

ponder.on("Escrow:IntentSignaled", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'intent', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDepositWithRate({
      depositId: event.args.depositId,
      currency: event.args.currency,
      verifier: event.args.verifier,
    }, context).then(({ deposit, depositCurrencyAdded, depositConversionRateUpdated }) => {
      // Find the conversion rate for this verifier
      const participantId = ids.participant({ chainId: context.chain.id, address: event.args.to })
      const depositCurrencyAddedId = depositCurrencyAdded!.depositCurrencyAddedId
      const depositConversionRateUpdatedId = depositConversionRateUpdated!.depositConversionRateUpdatedId

      return Promise.all([
        context.db.insert(schema.intentSignaled).values({
          orderId: oId,
          logId,
          intentHash: event.args.intentHash,
          depositId,
          verifier: event.args.verifier,
          amount: event.args.amount,
          depositCurrencyAddedId,
          depositVerifierAddedId: depositCurrencyAdded!.depositVerifierAddedId,
          depositConversionRateUpdatedId,
          owner: deposit.participantId,
          to: event.args.to,
          currency: event.args.currency,
          transactionId: transactionOrderId,
          participantId,
        }),
        context.db.insert(schema.participant).values({
          participantId,
          chainId: BigInt(context.chain.id),
          address: event.args.to,
        }).onConflictDoNothing(),
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          depositId,
          participantId,
        }).onConflictDoNothing(),
      ])
    })
  ])
})

ponder.on("Escrow:IntentPruned", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'pruned', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDeposit(depositId, context).then((deposit) => {
      // const actionId = ids.action({
      //   transactionId: transactionOrderId,
      //   participantId: deposit.participantId,
      // })
      const participantId = ids.participant({ chainId: context.chain.id, address: event.transaction.from! })
      return Promise.all([
        context.db.insert(schema.intentPruned).values({
          orderId: oId,
          logId,
          intentHash: event.args.intentHash,
          depositId,
          transactionId: transactionOrderId,
          participantId,
        }),
        context.db.insert(schema.participant).values({
          participantId,
          chainId: BigInt(context.chain.id),
          address: event.transaction.from!,
        }).onConflictDoNothing(),
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          participantId,
          depositId,
        }),
      ])
    })
  ])
})

const getDepositStatus = (action: StatusMutatingAction, deposit: {
  remaining: bigint,
  minAmount: bigint,
  status: DepositStatus,
}) => {
  if (action === 'deposit' || action === 'exchange') {
    if (deposit.status !== 'active') {
      return deposit.status
    }
    const oneToken = parseUnits('1', 6)
    const isUnderfunded = deposit.remaining < oneToken || deposit.remaining < deposit.minAmount
    const nextStatus = isUnderfunded ? 'underfunded' : 'active'
    return nextStatus
  }
  if (action === 'closed') {
    const nextStatus = deposit.status === 'active' || deposit.status === 'underfunded' ? 'closed' : deposit.status
    return nextStatus
  }
  if (action === 'withdrawal') {
    if (deposit.status === 'closed') {
      return deposit.status
    }
    return 'withdrawn'
  }
  throw new Error(`Unknown action: ${action}`)
}

ponder.on("Escrow:IntentFulfilled", async ({ event, context }) => {
  const logId = orderId.log({ event, context })
  const oId = orderId.order({ name: 'exchange', event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const ownerId = ids.participant({ chainId: context.chain.id, address: event.args.owner })
  const participantId = ids.participant({ chainId: context.chain.id, address: event.args.to })
  const depositId = orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    getDepositFromIntent({
      depositId,
      intentHash: event.args.intentHash,
    }, context).then(({ deposit, intentSignaled, depositCurrencyAdded, depositConversionRateUpdated }) => {
      // Find the conversion rate for this verifier

      const remaining = deposit.remaining - event.args.amount
      if (remaining < 0n) {
        console.error("Deposit remaining is negative", {
          depositId: event.args.depositId,
          intentHash: event.args.intentHash,
          remaining,
          amount: event.args.amount,
        })
        // throw new Error("Deposit remaining is negative")
      }
      return Promise.all([
        logStats(context, {
          timestamp: event.block.timestamp,
          action: 'exchange',
          amount: event.args.amount,
          currency: depositConversionRateUpdated!.currency,
          token: deposit.token,
          verifier: event.args.verifier,
        }),
        context.db.update(schema.deposit, {
          depositId: orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId }),
        }).set(() => ({
          remaining,
          status: getDepositStatus('exchange', {
            ...deposit,
            remaining,
          }),
        })),
        context.db.insert(schema.participant).values({
          participantId,
          chainId: BigInt(context.chain.id),
          address: event.args.to,
        }).onConflictDoNothing(),
        context.db.insert(schema.action).values({
          orderId: oId,
          logId,
          transactionId: transactionOrderId,
          participantId,
          depositId: orderId.deposit({ chainId: context.chain.id, depositId: event.args.depositId }),
        }),
        context.db.insert(schema.intentFulfilled).values({
          orderId: oId,
          logId,
          depositId,
          intentHash: event.args.intentHash,
          transactionId: transactionOrderId,
          verifier: event.args.verifier,
          currency: intentSignaled!.currency,
          ownerId,
          to: event.args.to,
          amount: event.args.amount,
          sustainabilityFee: event.args.sustainabilityFee,
          depositVerifierAddedId: depositCurrencyAdded!.depositVerifierAddedId,
          depositCurrencyAddedId: depositCurrencyAdded!.depositCurrencyAddedId,
          depositConversionRateUpdatedId: depositConversionRateUpdated!.depositConversionRateUpdatedId,
          verifierFee: event.args.verifierFee,
          participantId,
        }),
        context.db.insert(schema.depositDelta).values({
          orderId: oId,
          logId,
          depositId,
          amountBefore: deposit.remaining,
          delta: event.args.amount,
          amountAfter: remaining,
        }),
      ])
    }),
  ])
})

ponder.on("Escrow:PaymentVerifierAdded", async ({ event, context }) => {
  const logOrderId = orderId.log({ event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const verifierId = event.args.verifier
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.paymentVerifierAdded).values({
      orderId: logOrderId,
      verifier: event.args.verifier,
      verifierId,
      feeShare: event.args.feeShare,
      transactionId: transactionOrderId,
    }),
    context.db.insert(schema.paymentVerifier).values({
      id: verifierId,
      verifier: event.args.verifier,
      feeShare: event.args.feeShare,
      active: true,
    }).onConflictDoNothing(),
  ])
})

ponder.on("Escrow:PaymentVerifierFeeShareUpdated", async ({ event, context }) => {
  const logOrderId = orderId.log({ event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const verifierId = event.args.verifier
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.paymentVerifierFeeShareUpdated).values({
      orderId: logOrderId,
      verifier: event.args.verifier,
      verifierId,
      feeShare: event.args.feeShare,
      transactionId: transactionOrderId,
    }),
    context.db.update(schema.paymentVerifier, {
      id: verifierId,
    }).set({
      feeShare: event.args.feeShare,
    }),
  ])
})

ponder.on("Escrow:PaymentVerifierRemoved", async ({ event, context }) => {
  const logOrderId = orderId.log({ event, context })
  const transactionOrderId = orderId.transaction({ event, context })
  const verifierId = event.args.verifier
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.paymentVerifierRemoved).values({
      orderId: logOrderId,
      verifier: event.args.verifier,
      verifierId,
      transactionId: transactionOrderId,
    }),
    context.db.update(schema.paymentVerifier, {
      id: verifierId,
    }).set({
      active: false,
    }),
  ])
})
