import { isHash, keccak256, toBytes, type Hex } from 'viem'
import { addThousandsSeparator, type FormatRateDisplayOptions, formatUnits, parseUnits } from './units.js'
import countriesData from './data/countries.json' with { type: 'json' }
import { USD_FLAG_SVG, EUR_FLAG_SVG } from './flags.js'

// Convert SVG strings to data URLs
const USD_FLAG_DATA_URL = `data:image/svg+xml;base64,${btoa(USD_FLAG_SVG)}`
const EUR_FLAG_DATA_URL = `data:image/svg+xml;base64,${btoa(EUR_FLAG_SVG)}`

const countries = countriesData as CountryInfo[]

/**
 * Relevant info for a currency
 */
export interface CurrencyInfo {
  ticker: string
  symbol: string
  name: string
  decimals: number
  contractId: Hex // bytes32 hash of the currency code
  flag: string // flag image path
}

/**
 * Country info from the countries.json file
 */
export interface CountryInfo {
  code: string
  name: string
  country: string
  countryCode: string
  flag?: string
}

/**
 * Convert a ticker to a contract ID
 * @param ticker - The ticker to convert
 * @returns The contract ID
 */
export const tickerToContractId = (ticker: string): Hex => {
  return keccak256(toBytes(ticker.toUpperCase()))
}

/**
 * Currency class that automatically generates contract ID
 * @param code - The currency code
 * @param symbol - The currency symbol
 * @param name - The currency name
 * @param decimals - The number of decimals
 * @param flag - The flag image path
 */
export class Currency implements CurrencyInfo {
  public readonly ticker: string
  public readonly symbol: string
  public readonly name: string
  public readonly decimals: number
  public readonly contractId: Hex
  public readonly flag: string

  constructor(code: string, symbol: string, name: string, decimals: number, flag?: string) {
    this.ticker = code.toUpperCase()
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
    this.flag = flag || '' // figure out a fallback flag
    this.contractId = this.generateContractId()
  }

  /**
   * Generate a contract ID for the currency
   * @returns The contract ID
   */
  private generateContractId(): Hex {
    return tickerToContractId(this.ticker)
  }

  /**
   * Parse an amount to a bigint
   * @param amount - The amount to parse
   * @returns The amount as a bigint
   */
  parseAmount(amount: string): bigint | null {
    try {
      return parseUnits(amount, { decimals: this.decimals })
    } catch (error) {
      console.error('Error parsing amount: %o', amount, error)
      return null
    }
  }

  /**
   * Format an amount to a string
   * @param amount - The amount to format
   * @returns The amount as a string
   */
  formatAmount(amount: bigint | null, options: Partial<FormatRateDisplayOptions> = {}): string | null {
    try {
      if (amount === null) {
        return null
      }
      return formatUnits(amount, {
        decimals: this.decimals,
        truncateDecimals: 2,
        padDecimals: 2,
        ...options,
      })
    } catch (err) {
      console.error('Error formatting amount: %o', amount, err)
      return null
    }
  }

  /**
   * Convert to plain object for compatibility
   * @returns The currency info
   */
  toJSON(): CurrencyInfo {
    return {
      ticker: this.ticker,
      symbol: this.symbol,
      name: this.name,
      decimals: this.decimals,
      contractId: this.contractId,
      flag: this.flag,
    }
  }
}

/**
 * Generate contract ID for a currency code (standalone function for backward compatibility)
 * @param currencyCode - The currency code
 */
export function generateCurrencyId(currencyCode: string): string {
  const bytes = toBytes(currencyCode.toUpperCase())
  return keccak256(bytes)
}

/**
 * Get the flag for a country
 * @param countryCode - The country code
 * @returns The flag image path
 */
const flagFromCountries = (countryCode: string): string => {
  const country = countries.find((country) => country.code === countryCode)
  return country?.flag || ''
}

// Supported fiat currencies with local flag files for major ones
export const SUPPORTED_CURRENCIES = {
  USD: new Currency('USD', '$', 'US Dollar', 2, USD_FLAG_DATA_URL),
  EUR: new Currency('EUR', '€', 'Euro', 2, EUR_FLAG_DATA_URL),
  GBP: new Currency('GBP', '£', 'British Pound', 2, flagFromCountries('GBP')),
  AUD: new Currency('AUD', 'A$', 'Australian Dollar', 2, flagFromCountries('AUD')),
  CAD: new Currency('CAD', 'C$', 'Canadian Dollar', 2, flagFromCountries('CAD')),
  NZD: new Currency('NZD', 'NZ$', 'New Zealand Dollar', 2, flagFromCountries('NZD')),
  CHF: new Currency('CHF', 'CHF', 'Swiss Franc', 2, flagFromCountries('CHF')),
  SEK: new Currency('SEK', 'kr', 'Swedish Krona', 2, flagFromCountries('SEK')),
  NOK: new Currency('NOK', 'kr', 'Norwegian Krone', 2, flagFromCountries('NOK')),
  DKK: new Currency('DKK', 'kr', 'Danish Krone', 2, flagFromCountries('DKK')),
  PLN: new Currency('PLN', 'zł', 'Polish Złoty', 2, flagFromCountries('PLN')),
  CZK: new Currency('CZK', 'Kč', 'Czech Koruna', 2, flagFromCountries('CZK')),
  ARS: new Currency('ARS', 'ARS', 'Argentine Peso', 2, flagFromCountries('ARS')),
  CNY: new Currency('CNY', '¥', 'Chinese Yuan', 2, flagFromCountries('CNY')),
  MXN: new Currency('MXN', 'MX$', 'Mexican Peso', 2, flagFromCountries('MXN')),
  JPY: new Currency('JPY', '¥', 'Japanese Yen', 0, flagFromCountries('JPY')),
  THB: new Currency('THB', '฿', 'Thai Baht', 2, flagFromCountries('THB')),
  RUB: new Currency('RUB', '₽', 'Russian Ruble', 2, flagFromCountries('RUB')),
  AED: new Currency('AED', 'AED', 'United Arab Emirates Dirham', 2, flagFromCountries('AED')),
  ZAR: new Currency('ZAR', 'R', 'South African Rand', 2, flagFromCountries('ZAR')),
  HKD: new Currency('HKD', 'HK$', 'Hong Kong Dollar', 2, flagFromCountries('HKD')),
  SGD: new Currency('SGD', 'S$', 'Singapore Dollar', 2, flagFromCountries('SGD')),
  SAR: new Currency('SAR', 'SAR', 'Saudi Riyal', 2, flagFromCountries('SAR')),
  ILS: new Currency('ILS', '₪', 'Israeli New Shekel', 2, flagFromCountries('ILS')),
  IDR: new Currency('IDR', 'Rp', 'Indonesian Rupiah', 2, flagFromCountries('IDR')),
  MYR: new Currency('MYR', 'RM', 'Malaysian Ringgit', 2, flagFromCountries('MYR')),
  PHP: new Currency('PHP', '₱', 'Philippine Peso', 2, flagFromCountries('PHP')),
  VND: new Currency('VND', '₫', 'Vietnamese Dong', 0, flagFromCountries('VND')),
  KRW: new Currency('KRW', '₩', 'South Korean Won', 0, flagFromCountries('KRW')),
  INR: new Currency('INR', '₹', 'Indian Rupee', 2, flagFromCountries('INR')),
  BRL: new Currency('BRL', 'R$', 'Brazilian Real', 2, flagFromCountries('BRL')),
  KES: new Currency('KES', 'KES', 'Kenyan Shilling', 2, flagFromCountries('KES')),
  TRY: new Currency('TRY', '₺', 'Turkish Lira', 2, flagFromCountries('TRY')),
  UGX: new Currency('UGX', 'USh', 'Ugandan Shilling', 0, flagFromCountries('UGX')),
  RON: new Currency('RON', 'RON', 'Romanian Leu', 2, flagFromCountries('RON')),
  HUF: new Currency('HUF', 'Ft', 'Hungarian Forint', 2, flagFromCountries('HUF')),
} as const

/** Supported currency code */
export type SupportedCurrencyCode = keyof typeof SUPPORTED_CURRENCIES

/** Entries for the supported currencies */
const entries = Object.entries(SUPPORTED_CURRENCIES).sort(([a], [b]) => a.localeCompare(b))

entries.forEach(([, currency]) => {
  // console.log(currency.ticker, currency.contractId)
  if (!currency.flag) {
    console.error(`missing flag for ${currency.ticker}`)
  }
})

export const currencyById = new Map(entries.map(([, currency]) => {
  return [currency.contractId, currency] as const
}))

/**
 * Get the currency info for a currency code
 * @param currencyCode - The currency code
 * @returns The currency info
 */
export function getCurrencyInfo(currencyCode: string): CurrencyInfo | null {
  const currency = SUPPORTED_CURRENCIES[currencyCode.toUpperCase() as SupportedCurrencyCode]
  return currency ? currency.toJSON() : null
}

/**
 * Get the currency info for a contract ID
 * @param contractId - The contract ID
 * @returns The currency info
 */
export function getCurrencyByContractId(contractId: string): Currency | null {
  if (!isHash(contractId)) {
    throw new Error('Invalid contract ID')
  }
  const currency = currencyById.get(contractId)
  return currency ? currency : null
}

/**
 * Format currency amount safely without Number() constructor, preserving decimal places
 * @param value - The value to format
 * @param decimals - The number of decimals
 * @returns The formatted currency amount
 */
function formatCurrencyToFixedDecimals(value: string | number, decimals: number): string {
  const stringValue = value.toString()
  const [integerPart, fractionalPart = ''] = stringValue.split('.')

  if (decimals === 0) {
    return integerPart
  }

  // Pad or truncate fractional part to desired decimals
  const paddedFractional = fractionalPart.padEnd(decimals, '0').slice(0, decimals)

  // For currency formatting, always preserve trailing zeros
  return `${integerPart}.${paddedFractional}`
}

/**
 * Format a currency amount
 * @param amount - The amount to format
 * @param currencyCode - The currency code
 * @returns The formatted currency amount
 */
export function formatCurrencyAmount(amount: string | number, currencyCode: string): string {
  const currencyInfo = getCurrencyInfo(currencyCode)

  if (!currencyInfo) {
    return `${amount} ${currencyCode}`
  }

  // Use currency-specific formatting that preserves decimal places
  const formatted = formatCurrencyToFixedDecimals(amount, currencyInfo.decimals)

  // Add thousands separators for better readability
  const formattedWithSeparators = addThousandsSeparator(formatted)

  return `${currencyInfo.symbol}${formattedWithSeparators}`
}

/**
 * Get all supported currencies
 * @returns All supported currencies
 */
export function getAllSupportedCurrencies(): CurrencyInfo[] {
  return entries.map(([, currency]) => currency.toJSON())
}

/**
 * Check if a currency is supported
 * @param currencyCode - The currency code
 * @returns True if the currency is supported, false otherwise
 */
export function isSupportedCurrency(currencyCode: string): boolean {
  return currencyCode.toUpperCase() in SUPPORTED_CURRENCIES
}
