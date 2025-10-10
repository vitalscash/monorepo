import { concatHex, keccak256, numberToHex, stringToHex, type Hex } from "viem"
import { eventOrderId, type EventType } from "./events.js"
import { interval, type TimeResolutionKey } from "./time.js"
import type { StatAction } from "./stats.js"

export type DepositVerifierInputs = {
  verifier: Hex,
  depositId: Hex,
}

export type DepositCurrencyInputs = DepositVerifierInputs & {
  currency: Hex,
}

export type ConversionRateUpdatedInputs = DepositCurrencyInputs & {
  changeId: number
}

export type ProviderHashInputs = { chainId: bigint | number; hash: Hex }

export type OnChainHashInputs = { chainId: bigint | number; hash: Hex }

export type OnChainAddressInputs = { chainId: bigint | number; address: Hex }

export const onChainHash = ({ chainId, hash }: OnChainHashInputs) => (
  keccak256(concatHex([
    numberToHex(chainId, { size: 8 }),
    hash,
  ]))
)

export const onChainAddress = ({ chainId, address }: OnChainAddressInputs) => (
  onChainHash({ chainId, hash: address })
)

export const ids = {
  block: onChainHash,
  transaction: onChainHash,
  participant: onChainAddress,
  providerHash: onChainHash,
  verifier: onChainAddress,
  depositVerifierAdded: ({ depositId, verifier }: DepositVerifierInputs) => {
    return keccak256(concatHex([depositId, verifier]))
  },
  depositCurrencyAdded: ({ depositId, currency, verifier }: DepositCurrencyInputs) => {
    return keccak256(concatHex([
      ids.depositVerifierAdded({ verifier, depositId }),
      currency,
    ]))
  },
  depositConversionRateUpdated: ({ currency, verifier, depositId, changeId }: ConversionRateUpdatedInputs) => {
    return concatHex([
      ids.depositCurrencyAdded({ currency, verifier, depositId }),
      numberToHex(changeId, { size: 4 }),
    ])
  },
};

export type OrderIdInputs = {
  timestamp: bigint
  chainId: bigint
}

export type OrderIdTransactionInputs = OrderIdInputs & {
  transactionIndex: bigint
}

export type OrderIdLogInputs = OrderIdTransactionInputs & {
  logIndex: bigint
}

export type OrderIdOrderInputs = OrderIdLogInputs & { name: EventType }

export type DepositIdInputs = { chainId: bigint | number; depositId: bigint | number }

export type LogStatsIdInputs = {
  timestamp: bigint,
  type: TimeResolutionKey,
  action: StatAction,
  currency: Hex | null,
  token: Hex,
  verifier: Hex,
  chainId: bigint | number,
}

const hourFactor = BigInt(interval.hour) / BigInt(interval.second)
const dayFactor = BigInt(interval.day) / BigInt(interval.second)
const monthFactor = BigInt(interval.month) / BigInt(interval.second)

export const orderId = {
  deposit: ({ chainId, depositId }: DepositIdInputs) => concatHex([
    numberToHex(depositId, { size: 8 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  block: ({ timestamp, chainId }: OrderIdInputs) => concatHex([
    numberToHex(timestamp, { size: 8 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  transaction: ({ timestamp, chainId, transactionIndex }: OrderIdTransactionInputs) => concatHex([
    numberToHex(timestamp, { size: 8 }),
    numberToHex(transactionIndex, { size: 4 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  log: ({ timestamp, chainId, transactionIndex, logIndex }: OrderIdLogInputs) => concatHex([
    numberToHex(timestamp, { size: 8 }),
    numberToHex(transactionIndex, { size: 4 }),
    numberToHex(logIndex, { size: 4 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  order: ({ timestamp, chainId, transactionIndex, logIndex, name }: OrderIdOrderInputs) => concatHex([
    numberToHex(timestamp, { size: 8 }),
    numberToHex(transactionIndex!, { size: 4 }),
    numberToHex(eventOrderId.get(name)!, { size: 1 }),
    numberToHex(logIndex, { size: 4 }),
    numberToHex(chainId, { size: 4 }),
  ]),
  stat: ({ timestamp, type, action, currency, verifier, token, chainId }: LogStatsIdInputs) => {
    const hour = (timestamp / hourFactor) * hourFactor
    const day = (timestamp / dayFactor) * dayFactor
    const month = (timestamp / monthFactor) * monthFactor
    let time = timestamp
    if (type === "hour") {
      time = hour
    }
    if (type === "day") {
      time = day
    }
    if (type === "month") {
      time = month
    }
    return concatHex([
      numberToHex(time, { size: 8 }),
      `0x${keccak256(concatHex([stringToHex(type), stringToHex(action), token, currency ?? '0x', verifier])).slice(26)}`,
      numberToHex(chainId, { size: 4 }),
    ])
  },
};
