import { DepositIdInputs, eventOrderId, EventType, LogStatsIdInputs, orderId as orderIdUtils } from "@vitals/utils";
import { ponder, type Context, type Event } from "ponder:registry";
import * as schema from "ponder:schema";
import { Hex, numberToHex } from "viem";
import { concatHex } from "viem";


export type DepositStatus = (typeof schema.status.enumValues)[number]

export type OrderIdInputs = {
  event: Event,
  context: Context,
}

export type LogStatsInputs = LogStatsIdInputs & {
  amount: bigint,
}

export const orderId = {
  deposit: ({ chainId, depositId }: DepositIdInputs) => concatHex([
    numberToHex(depositId, { size: 8 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  block: ({ event, context }: OrderIdInputs) => concatHex([
    numberToHex(event.block.timestamp, { size: 8 }),
    numberToHex(context.chain.id, { size: 4 }),
  ]),
  transaction: ({ event, context }: OrderIdInputs) => concatHex([
    numberToHex(event.block.timestamp, { size: 8 }),
    numberToHex(event.transaction.transactionIndex!, { size: 4 }),
    numberToHex(context.chain.id, { size: 4 }),
  ]),
  log: ({ event, context }: OrderIdInputs) => concatHex([
    numberToHex(event.block.timestamp, { size: 8 }),
    numberToHex(event.transaction.transactionIndex!, { size: 4 }),
    numberToHex(event.log.logIndex, { size: 4 }),
    numberToHex(context.chain.id, { size: 4 }),
  ]),
  order: ({ name, event, context }: OrderIdInputs & { name: EventType }) => concatHex([
    numberToHex(event.block.timestamp, { size: 8 }),
    numberToHex(event.transaction.transactionIndex!, { size: 4 }),
    numberToHex(eventOrderId.get(name)!, { size: 1 }),
    numberToHex(event.log.logIndex, { size: 4 }),
    numberToHex(context.chain.id, { size: 4 }),
  ]),
  stat: (context: Context, { timestamp, type, action, currency, verifier, token }: Omit<LogStatsIdInputs, 'chainId'>) => {
    return orderIdUtils.stat({
      timestamp,
      type,
      action,
      currency,
      verifier,
      token,
      chainId: context.chain.id,
    })
  },
};

export const upsertBlock = async (event: Event, context: Context) => {
  const chainId = BigInt(context.chain.id)
  return await context.db.insert(schema.block).values({
    orderId: orderId.block({ event, context }),
    chainId,
    number: event.block.number!,
    timestamp: event.block.timestamp,
    hash: event.block.hash!,
  }).onConflictDoNothing();
};

export const upsertTransaction = async (event: Event, context: Context, to?: Hex) => {
  return await context.db.insert(schema.transaction).values({
    orderId: orderId.transaction({ event, context }),
    index: BigInt(event.transaction.transactionIndex!),
    hash: event.transaction.hash!,
    from: event.transaction.from!,
    to: event.transaction.to ?? to!,
    blockId: orderId.block({ event, context }),
  }).onConflictDoNothing();
};
