import { formatUnits as viemFormatUnits, parseUnits as viemParseUnits } from 'viem'
import type { TokenInfo } from './tokens.js'

export const oneEther = 10n ** 18n

// Add thousands separators to a number string
export function addThousandsSeparator(numberString: string, delimiter: string = ','): string {
  let [integerPart, fractionalPart] = numberString.split('.')

  integerPart = integerPart || '0'
  fractionalPart = fractionalPart || ''

  // Add thousands separators to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)

  // Return with fractional part if it exists
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}

// // Format currency amounts with exactly 2 decimal places and thousands separators
// export function formatCurrencyDisplay(amount: bigint, decimals: number): string {
//   const formatted = formatUnits(amount, decimals)
//   const [integerPart, fractionalPart = ''] = formatted.split('.')

//   // Ensure exactly 2 decimal places for currency
//   const paddedFractional = fractionalPart.padEnd(2, '0').substring(0, 2)
//   const numberString = `${integerPart}.${paddedFractional}`

//   // Add thousands separators for better readability
//   return addThousandsSeparator(numberString)
// }

// Options for formatRateDisplay function
export interface FormatRateDisplayOptions {
  decimals: number
  truncateDecimals?: number
  padDecimals?: number
  cutoff?: bigint
  delimiter?: string
  roundUp?: boolean
}

export const parseUnits = (amount: string, options: Pick<FormatRateDisplayOptions, 'decimals' | 'delimiter'>): bigint => {
  return viemParseUnits(amount.split(options.delimiter ?? ',').join(''), options.decimals)
}

// Format exchange rates with natural precision, minimum 2 decimal places and thousands separators
export function formatUnits(amount: bigint, options: FormatRateDisplayOptions): string {
  const { decimals, truncateDecimals, padDecimals = 0, delimiter = ',', cutoff, roundUp = false } = options
  if (cutoff && amount < cutoff) {
    return `<${formatUnits(cutoff, { ...options, truncateDecimals: 0, cutoff: undefined })}`
  }
  if (roundUp && truncateDecimals !== undefined) {
    // const minimumDecimal = decimals - truncateDecimals
    const minimumDecimal = BigInt(decimals - truncateDecimals)
    const minimalMod = amount % (10n ** minimumDecimal)
    const halfMinimalDecimal = (10n ** minimumDecimal) / 2n
    if (minimalMod >= halfMinimalDecimal) {
      amount = amount + (10n ** minimumDecimal) - minimalMod
    }
  }
  const formatted = viemFormatUnits(amount, decimals)


  const [integerPart, fractionalPart = ''] = formatted.split('.')

  // If truncateDecimals is specified, limit decimal places
  let finalFractionalPart = fractionalPart
  if (truncateDecimals !== undefined) {
    finalFractionalPart = fractionalPart.slice(0, truncateDecimals)
  }

  // Always pad to at least 2 decimal places (or padDecimals)
  if (finalFractionalPart.length < padDecimals) {
    finalFractionalPart = finalFractionalPart.padEnd(padDecimals, '0')
  }

  // If there are no decimals, still show .00
  const numberString = `${integerPart}.${finalFractionalPart}`
  return addThousandsSeparator(numberString, delimiter)
}

export function formatTokenAmountForDisplay(amount: bigint, options: FormatRateDisplayOptions): string {
  return formatUnits(amount, { truncateDecimals: 2, ...options })
}

// Safe integer parsing without using Number()
export function parseIntegerSafe(value: string): number | null {
  // Use parseInt instead of Number() for integer parsing
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? null : parsed
}

// // Get display title for limits (shows original user limits on hover)
// export function getLimitsDisplayTitle(deposit: { formattedMinAmount: string; formattedMaxAmount: string }): string {
//   return `User set: ${deposit.formattedMinAmount} - ${deposit.formattedMaxAmount}`
// }

// Convert blockchain timestamp (seconds) to Date object
export function timestampToDate(timestamp: string | number | bigint | undefined | null): Date | null {
  if (!timestamp) return null

  // Convert seconds to milliseconds for Date constructor
  const timestampMs = Number(timestamp) * 1000
  return new Date(timestampMs)
}

// export function formatTokenAmountForDisplay(amount: bigint, tokenInfo: TokenInfo): string {
//   return formatUnits(amount, { decimals: tokenInfo.decimals })
// }

export const formatAmount = (token: TokenInfo, amount: bigint | null, options: Partial<FormatRateDisplayOptions> = {}) => {
  if (!amount) return null
  return formatUnits(amount, {
    decimals: token.decimals,
    truncateDecimals: Math.min(token.decimals - 4, 8),
    padDecimals: 2,
    ...options,
  })
}
