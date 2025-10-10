import { getCurrencyByContractId } from "./currencies.js"
import { getDefaultToken } from "./tokens.js"
import type { ChainId } from "./chain.js"

/** BigIntish type */
export type BigIntish = string | bigint | number

/** Profit calculation input */
export interface ProfitCalculationInput {
  amount: BigIntish
  chainId: ChainId
  conversionRate: {
    value: BigIntish
    currency: string
  }
}

/**
 * Calculate the profit of an intent fulfilled event
 * @param param0.amount - The amount
 * @param param0.conversionRate - The conversion rate
 * @returns The profit
 */
export const calculateProfit = ({
  amount: amountInput,
  conversionRate,
  chainId,
}: ProfitCalculationInput) => {
  const rate = BigInt(conversionRate.value)
  const amount = BigInt(amountInput)
  const valueReceived = amount * rate / 10n ** 18n
  const currency = getCurrencyByContractId(conversionRate.currency)
  const inputTokenInfo = getDefaultToken(chainId)
  const isOneForOne = currency!.ticker === 'USD'

  if (inputTokenInfo && isOneForOne) {
    return valueReceived - amount
  }
  return null
}

/**
 * Calculate the profits for a list of inputs
 * @param inputs - The inputs to calculate the profits for a series of intents
 * @returns The profits
 */
export const calculateProfits = (inputs: ProfitCalculationInput[]) => {
  const profitAmounts = inputs.map(calculateProfit)
  const nullAmounts = profitAmounts.filter((amount) => amount === null).length
  const profit = profitAmounts.reduce((acc: bigint, curr) => !!curr ? acc + curr : acc, 0n)
  return {
    profit,
    nullAmounts,
  }
}
