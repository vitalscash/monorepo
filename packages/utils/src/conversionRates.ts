import type { Hex } from 'viem'
import { Currency, SUPPORTED_CURRENCIES } from './currencies.js'
import { verifierGetsKey, type ProviderKey } from './payment.js'
import type { SortDirection } from './sort.js'
import type { TokenInfo } from './tokens.js'
import type { ChainId } from './chain.js'

/**
 * Conversion rate info
 */
export interface ConversionRateInfo {
  depositConversionRateUpdatedId: string
  currency: string
  verifier: string
  value: string
  orderId: string
  depositId: string
  transaction: {
    hash: string
    block: {
      timestamp: string
    }
  }
}

/**
 * Conversion rate info with current deposit conversion rate updated
 */
export interface ConversionRateInfoWithCurrent extends ConversionRateInfo {
  currentDepositConversionRateUpdatedId: string
  currentDepositConversionRateUpdated: {
    value: string
  }
}

/**
 * Provider rates
 */
export type ProviderRates<RateInfo> = Map<ProviderKey, Map<Hex, RateInfo>>

/**
 * Process conversion rates options
 */
interface ProcessConversionRatesOptions {
  chainId: ChainId
  events: ConversionRateInfoWithCurrent[]
  sortOrder?: SortDirection // Default: 'desc' (most recent first)
  includeHistorical?: boolean // Default: false (only latest rates)
}

/**
 * Get conversion rate options
 */
interface GetConversionRateOptions {
  events: ConversionRateInfoWithCurrent[]
  currency: Hex
  verifier: string
  chainId: ChainId
  includeHistory?: boolean // Default: false (only latest rate)
  fallbackRate?: { currency: string; value: string; verifier: string } | null
}

/**
 * Extract currencies options
 */
interface ExtractCurrenciesOptions {
  providerRates: ProviderRates<ConversionRateInfo[]>
  providersOnly?: ProviderKey[] // Filter to specific providers
  currenciesOnly?: string[] // Filter to specific currencies
}

/**
 * Process deposit currency added events into organized conversion rates
 */
export function processConversionRates(options: ProcessConversionRatesOptions): ProviderRates<ConversionRateInfo[]> {
  const {
    events,
    sortOrder = 'asc',
    includeHistorical = false,
    chainId,
  } = options

  const ratesMap = new Map<ProviderKey, Map<Hex, ConversionRateInfo[]>>()

  // Sort events by orderId
  const sortedEvents = [...events].sort((a, b) =>
    sortOrder === 'desc'
      ? b.orderId.localeCompare(a.orderId)
      : a.orderId.localeCompare(b.orderId)
  )

  for (const event of sortedEvents) {
    if (!event.currentDepositConversionRateUpdated) continue

    const providerKey = verifierGetsKey(chainId, event.verifier)
    const currency = event.currency as Hex

    // Get or create provider rates map
    const providerRates = ratesMap.get(providerKey) ?? new Map<Hex, ConversionRateInfo[]>()

    // Get or create currency rates array
    const currencyRates = providerRates.get(currency) ?? []

    const rateInfo: ConversionRateInfo = {
      currency,
      depositConversionRateUpdatedId: event.currentDepositConversionRateUpdatedId,
      value: event.currentDepositConversionRateUpdated.value ?? '',
      verifier: event.verifier,
      orderId: event.orderId,
      depositId: event.depositId,
      transaction: {
        hash: event.transaction!.hash!,
        block: {
          timestamp: event.transaction!.block!.timestamp
        }
      },
    }

    if (includeHistorical) {
      // Add all rates chronologically
      currencyRates.push(rateInfo)
    } else {
      // Only keep the latest rate (first in desc order, last in asc order)
      if (currencyRates.length === 0) {
        currencyRates.push(rateInfo)
      } else if (sortOrder === 'asc') {
        // Replace with newer rate
        currencyRates[0] = rateInfo
      }
      // For desc order with includeHistorical=false, we only add the first (most recent) rate
    }

    providerRates.set(currency, currencyRates)
    ratesMap.set(providerKey, providerRates)
  }

  return ratesMap
}

/**
 * Get conversion rate for a specific currency and verifier combination
 */
export function getConversionRate(options: GetConversionRateOptions): ConversionRateInfo | ConversionRateInfo[] | null {
  const {
    events,
    currency,
    verifier,
    chainId,
    includeHistory = false,
    fallbackRate
  } = options

  // Process rates to get organized data
  const providerRates = processConversionRates({
    events,
    includeHistorical: includeHistory,
    chainId,
  })

  const providerKey = verifierGetsKey(chainId, verifier)
  const rates = providerRates.get(providerKey)?.get(currency)

  if (rates && rates.length > 0) {
    return includeHistory ? rates : rates[0]
  }

  // Check fallback rate if provided
  if (fallbackRate &&
    fallbackRate.currency === currency &&
    fallbackRate.verifier === verifier) {
    return {
      depositConversionRateUpdatedId: '0',
      currency: fallbackRate.currency,
      value: fallbackRate.value,
      verifier: fallbackRate.verifier,
      depositId: '0',
      orderId: '0', // Indicate this is a fallback/original rate
      transaction: {
        hash: '0',
        block: {
          timestamp: '0'
        }
      }
    }
  }

  return null
}

/**
 * Extract unique currencies from processed provider rates
 */
export function extractCurrencies(options: ExtractCurrenciesOptions): string[] {
  const { providerRates, providersOnly, currenciesOnly } = options

  const currencySet = new Set<string>()

  for (const [providerKey, currencyMap] of providerRates.entries()) {
    // Filter by providers if specified
    if (providersOnly && !providersOnly.includes(providerKey)) {
      continue
    }

    for (const [currency] of currencyMap.entries()) {
      // Filter by currencies if specified
      if (currenciesOnly && !currenciesOnly.includes(currency)) {
        continue
      }

      currencySet.add(currency)
    }
  }

  return Array.from(currencySet)
}

/**
 * Get the latest conversion rate across all providers for a currency
 */
export function getLatestRateForCurrency(options: {
  providerRates: ProviderRates<ConversionRateInfo>
  currency: Hex
  preferredProvider?: ProviderKey
}): ConversionRateInfo | null {
  const { providerRates, currency, preferredProvider } = options

  let latestRate: ConversionRateInfo | null = null
  let latestTimestamp = BigInt(0)

  // Check preferred provider first
  if (preferredProvider) {
    const providerRate = providerRates.get(preferredProvider)?.get(currency)
    if (providerRate && providerRate.transaction.block.timestamp) {
      const tsmp = BigInt(providerRate.transaction.block.timestamp)
      if (tsmp > latestTimestamp) {
        latestRate = providerRate
        latestTimestamp = tsmp
      }
    }
  }

  // Check all other providers
  for (const [providerKey, currencyMap] of providerRates.entries()) {
    if (providerKey === preferredProvider) continue // Already checked

    const rate = currencyMap.get(currency)
    if (rate && rate.transaction.block.timestamp) {
      const tsmp = BigInt(rate.transaction.block.timestamp)
      if (tsmp > latestTimestamp) {
        latestRate = rate
        latestTimestamp = tsmp
      }
    }
  }

  return latestRate
}

/**
 * Get the primary conversion rate from processed provider rates
 * Returns the first available rate, prioritizing by provider order
 */
export function getPrimaryConversionRate(providerRates: ProviderRates<ConversionRateInfo>): ConversionRateInfo | null {
  for (const [, currencyMap] of providerRates) {
    const usd = currencyMap.get(SUPPORTED_CURRENCIES.USD.contractId)
    if (usd) {
      return usd
    }
  }
  for (const [, currencyMap] of providerRates) {
    for (const [, rate] of currencyMap.entries()) {
      return rate
    }
  }
  return null
}

/**
 * Get primary conversion rate for a specific currency across all providers
 */
export function getPrimaryRateForCurrency(
  providerRates: ProviderRates<ConversionRateInfo>,
  currency: Hex
): ConversionRateInfo | null {
  for (const [, currencyMap] of providerRates) {
    const rates = currencyMap.get(currency)
    if (rates) {
      return rates
    }
  }
  return null
}

/**
 * Get the primary verifier (payment provider) from conversion rates
 */
export function getPrimaryVerifier(providerRates: ProviderRates<ConversionRateInfo>): string | null {
  const primaryRate = getPrimaryConversionRate(providerRates)
  return primaryRate?.verifier || null
}

/**
 * Get the primary currency from conversion rates
 */
export function getPrimaryCurrency(providerRates: ProviderRates<ConversionRateInfo>): string | null {
  const primaryRate = getPrimaryConversionRate(providerRates)
  return primaryRate?.currency || null
}

/**
 * Convert token input to currency
 */
export const convertTokenInputToCurrency = ({ token, amountOutInt, rate }: {
  token: TokenInfo
  amountOutInt: bigint
  rate: bigint
}): bigint => {
  const oneCent = 10n ** BigInt(token.decimals - 2)
  const oneEther = 10n ** 18n
  const amountInInt = amountOutInt * BigInt(rate) / oneEther
  const remainder = amountInInt % oneCent
  const negativeSpace = oneCent - remainder
  const finalAmountInInt = amountInInt + (negativeSpace === oneCent ? 0n : negativeSpace)
  return finalAmountInInt
}

/**
 * Convert currency amount to token amount out (inverse of convertTokenInputToCurrency)
 * This accounts for the cent-rounding applied in the original function
 */
export const convertCurrencyToTokenOutput = ({
  token,
  currency,
  currencyAmountInt,
  rate,
}: {
  token: TokenInfo
  currency: Currency
  currencyAmountInt: bigint
  rate: bigint
}): bigint => {
  const smallestUnit = 10n ** BigInt(token.decimals - currency.decimals)
  const oneEther = 10n ** 18n

  // First, we need to find the original amount before cent-rounding was applied
  // The original function rounds up to the nearest cent, so we need to find
  // the maximum token amount that would result in this currency amount after rounding

  // Start with the direct inverse calculation
  // console.log('currencyAmountInt', currencyAmountInt, smallestUnit, converter, rate)
  let tokenAmountOut = (currencyAmountInt * smallestUnit * oneEther) / rate

  const remainder = tokenAmountOut % smallestUnit
  const finalTokenAmountOut = (tokenAmountOut - remainder)
  return finalTokenAmountOut
}
