import type { Hex } from "viem"

/**
 * Structure for an intent
 */
export interface IntentStruct {
  owner: Hex
  to: Hex
  depositId: bigint
  amount: bigint
  timestamp: bigint
  paymentVerifier: Hex
  fiatCurrency: Hex
  conversionRate: bigint
}
