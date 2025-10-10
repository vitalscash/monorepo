import { type Chain, getAddress, parseUnits, zeroAddress, type Hex } from "viem"
import { base, pulsechain } from "viem/chains"

import { contractsByChainId, getContracts } from "./contracts.js"
import { formatUnits } from "./units.js"
import type { TokenInfo } from "./tokens.js"
import type { ConversionRateInfo, ProviderRates } from "./conversionRates.js"
import { SUPPORTED_CURRENCIES } from "./currencies.js"
import { ChainId } from "./chain.js"

/**
 * Payment providers, including manual
 */
export const providers = {
  VENMO: 'venmo',
  ZELLE: 'zelle',
  CASHAPP: 'cashapp',
  REVOLUT: 'revolut',
  WISE: 'wise',
  MERCADOPAGO: 'mercadopago',
  MANUAL: 'manual',
  PAYPAL: 'paypal',
  MONZO: 'monzo',
} as const

export type ProviderKey = typeof providers[keyof typeof providers]

/** Distinct keys for payment sub-providers (currently only used by Zelle) */
export const subProviders = {
  CHASE: 'chase',
  BANK_OF_AMERICA: 'bank_of_america',
  CITI: 'citi',
} as const

/** Sub-provider key (providers within providers) */
export type SubProviderKey = typeof subProviders[keyof typeof subProviders]

/** Action type for a provider */
export type ProviderKeyActionType = 'transfer' | 'send'

/** Validatable provider key */
export type ValidatableProviderKey = Exclude<ProviderKey, typeof providers.MANUAL>

/** Transparent platforms */
export type TransparentPlatforms = typeof providers.ZELLE

/** Platform key */
export type PlatformKey = Exclude<ValidatableProviderKey, TransparentPlatforms> | SubProviderKey

/** Action type */
export type ActionType = `${ProviderKeyActionType}_${ProviderKey}`

/** Provider key to validation key */
export const providerKeyToValidationKey = {
  venmo: 'venmoUsername',
  zelle: 'zelleEmail',
  cashapp: 'cashtag',
  revolut: 'revolutUsername',
  wise: 'wisetag',
  mercadopago: 'cvu',
  paypal: 'paypalEmail',
  monzo: 'monzoMeUsername',
} as Record<ValidatableProviderKey, string>

/** Validation key */
export type ValidationKey = typeof providerKeyToValidationKey[keyof typeof providerKeyToValidationKey]

/** Limits for a payment method */
export type Limits = {
  min: number
}

/** Send link options */
export type SendLinkOptions = {
  username: string
  amount: bigint
  subProvider?: SubProviderKey
  qrCode?: boolean
}

/** Send link */
export type SendLink = (options: SendLinkOptions) => string | null

/** Payment sub-provider config */
export type PaymentSubProviderConfig = {
  key: SubProviderKey
  name: string
  icon?: string
  color?: string
  usernameType?: string
  verifiers: (chain: ChainId) => Hex[]
  sendLink: SendLink
  paymentMethod: number
}

/** Payment config */
export type PaymentConfig = {
  icon: string
  key: ProviderKey
  name: string
  color: string
  usernameType: string
  validationKey: ValidationKey | null
  verifiers: string[]
  limits: Limits
  /**
   * Set of sub-provider keys that this payment method supports. Empty when none.
   */
  subProviders: Set<PaymentSubProviderConfig>
  list: Hex[]
  sendLink?: SendLink
}

/** Validation deposit data payment identifier */
export type ValidationDepositDataPaymentIdentifier = Partial<{
  [key in Exclude<ValidationKey, null>]: string
}>

/** Validation deposit data */
export type ValidationDepositData = ValidationDepositDataPaymentIdentifier & {
  telegramUsername: string
}

/** Data encoding for zelle urls */
export const dataEncoding = (data: string) => {
  return btoa(JSON.stringify({
    name: '',
    action: 'payment',
    token: data,
  }))
}

/** Default Zelle send link */
export const defaultZelleSendLink = (options: SendLinkOptions) => (
  !options.username ? null
    : `https://enroll.zellepay.com/qr-codes?data=${dataEncoding(options.username)}`
)

/** Global configuration for all supported sub-providers. Other modules can import this directly. */
export const subProviderConfigs: Partial<Record<ProviderKey, Record<SubProviderKey, PaymentSubProviderConfig>>> = {
  zelle: {
    chase: {
      paymentMethod: 0,
      key: subProviders.CHASE,
      name: 'Chase',
      icon: 'simple-icons:chase',
      verifiers: (chain) => getContracts(chain)!.zelleChaseReclaimVerifier,
      sendLink: (opts) => {
        if (opts.qrCode) {
          return defaultZelleSendLink(opts)
        }
        return 'https://secure.chase.com/web/auth/dashboard#/dashboard/singleDoor/singleDoorController/index'
      },
    },
    bank_of_america: {
      paymentMethod: 1,
      key: subProviders.BANK_OF_AMERICA,
      name: 'Bank of America',
      icon: 'simple-icons:bankofamerica',
      verifiers: (chain) => getContracts(chain)!.zelleBoAReclaimVerifier,
      sendLink: (opts) => {
        if (opts.qrCode) {
          return `https://www.bankofamerica.com/movemoney`
        }
        return 'https://www.bankofamerica.com/'
      },
    },
    citi: {
      paymentMethod: 2,
      key: subProviders.CITI,
      name: 'Citi',
      icon: 'arcticons:citi-mobile',
      verifiers: (chain) => getContracts(chain)!.zelleCitiReclaimVerifier,
      sendLink: (opts) => {
        if (opts.qrCode) {
          return defaultZelleSendLink(opts)
        }
        return 'https://online.citi.com/US/nga/zelle/transfer'
      },
    },
  },
}

/** Payment method icon mappings */
export const providerConfigs = (chainId: ChainId) => {
  const contracts = getContracts(chainId)!
  return {
    venmo: {
      key: providers.VENMO,
      icon: 'ion:logo-venmo',
      name: 'Venmo',
      usernameType: 'Venmo Username',
      validationKey: providerKeyToValidationKey.venmo,
      color: 'rgb(0, 116, 222)',
      verifiers: contracts.venmoReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      sendLink: (options) => {
        if (options.qrCode) {
          return `venmo://paycharge?txn=pay&recipients=${options.username}&note=cash&amount=${options.amount}`
        }
        return `https://account.venmo.com/pay?recipients=${options.username}&note=cash&amount=${options.amount}`
      },
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
      ],
    },
    zelle: {
      key: providers.ZELLE,
      icon: 'simple-icons:zelle',
      name: 'Zelle',
      color: '#6d1fd4',
      usernameType: 'Zelle Email',
      validationKey: providerKeyToValidationKey.zelle,
      verifiers: contracts.zelleBaseVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set([
        subProviderConfigs.zelle![subProviders.CHASE],
        subProviderConfigs.zelle![subProviders.BANK_OF_AMERICA],
        subProviderConfigs.zelle![subProviders.CITI],
      ]),
      // Delegate to sub-provider specific link when provided, otherwise fall back to generic QR URL
      sendLink: (options) => {
        if (options.subProvider) {
          return subProviderConfigs.zelle![options.subProvider]!.sendLink!(options)
        }
        return defaultZelleSendLink(options)
      },
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
      ],
    },
    cashapp: {
      key: providers.CASHAPP,
      icon: 'simple-icons:cashapp',
      name: 'Cash App',
      color: 'rgba(0,224,19,1.0)',
      usernameType: 'CashTag',
      validationKey: providerKeyToValidationKey.cashapp,
      verifiers: contracts.cashappReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
      ],
      sendLink: (options) => {
        const u = options.username.startsWith('$') ? options.username : `$${options.username}`
        return `https://cash.app/qr/${u}?size=288&margin=0`
      },
    },
    revolut: {
      key: providers.REVOLUT,
      icon: 'simple-icons:revolut',
      name: 'Revolut',
      color: '#191c1f',
      usernameType: 'RevTag',
      validationKey: providerKeyToValidationKey.revolut,
      verifiers: contracts.revolutReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      sendLink: (options) => `https://revolut.me/${options.username}`,
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
        SUPPORTED_CURRENCIES.EUR.contractId,
        SUPPORTED_CURRENCIES.GBP.contractId,
        SUPPORTED_CURRENCIES.AUD.contractId,
        SUPPORTED_CURRENCIES.CAD.contractId,
        SUPPORTED_CURRENCIES.HKD.contractId,
        SUPPORTED_CURRENCIES.MXN.contractId,
        SUPPORTED_CURRENCIES.NZD.contractId,
        SUPPORTED_CURRENCIES.PLN.contractId,
        SUPPORTED_CURRENCIES.SAR.contractId,
        SUPPORTED_CURRENCIES.SGD.contractId,
        SUPPORTED_CURRENCIES.ZAR.contractId,
        SUPPORTED_CURRENCIES.CHF.contractId,
        SUPPORTED_CURRENCIES.THB.contractId,
        SUPPORTED_CURRENCIES.TRY.contractId,
        SUPPORTED_CURRENCIES.AED.contractId,
      ],
    },
    wise: {
      key: providers.WISE,
      icon: 'simple-icons:wise',
      name: 'Wise',
      color: '#9fe870',
      usernameType: 'WiseTag',
      validationKey: providerKeyToValidationKey.wise,
      verifiers: contracts.wiseReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      sendLink: (options) => `https://wise.com/pay/me/${options.username}`,
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
        SUPPORTED_CURRENCIES.EUR.contractId,
        SUPPORTED_CURRENCIES.GBP.contractId,
        SUPPORTED_CURRENCIES.AUD.contractId,
        SUPPORTED_CURRENCIES.CAD.contractId,
        SUPPORTED_CURRENCIES.CNY.contractId,
        SUPPORTED_CURRENCIES.HKD.contractId,
        SUPPORTED_CURRENCIES.IDR.contractId,
        SUPPORTED_CURRENCIES.ILS.contractId,
        SUPPORTED_CURRENCIES.JPY.contractId,
        SUPPORTED_CURRENCIES.KES.contractId,
        SUPPORTED_CURRENCIES.MYR.contractId,
        SUPPORTED_CURRENCIES.MXN.contractId,
        SUPPORTED_CURRENCIES.NZD.contractId,
        SUPPORTED_CURRENCIES.PLN.contractId,
        SUPPORTED_CURRENCIES.SGD.contractId,
        SUPPORTED_CURRENCIES.ZAR.contractId,
        SUPPORTED_CURRENCIES.CHF.contractId,
        SUPPORTED_CURRENCIES.THB.contractId,
        SUPPORTED_CURRENCIES.TRY.contractId,
        SUPPORTED_CURRENCIES.UGX.contractId,
        SUPPORTED_CURRENCIES.AED.contractId,
        SUPPORTED_CURRENCIES.VND.contractId,
      ],
    },
    mercadopago: {
      key: providers.MERCADOPAGO,
      icon: 'simple-icons:mercadopago',
      name: 'Mercado Pago',
      usernameType: 'Mercado Pago / Bank CVU',
      color: '#ffe600',
      validationKey: providerKeyToValidationKey.mercadopago,
      verifiers: contracts.mercadopagoReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      sendLink: () => `https://www.mercadopago.com.ar/money-out/transfer/`,
      list: [
        SUPPORTED_CURRENCIES.ARS.contractId,
      ],
    },
    paypal: {
      key: providers.PAYPAL,
      icon: 'simple-icons:paypal',
      name: 'PayPal',
      usernameType: 'PayPal Email',
      validationKey: providerKeyToValidationKey.paypal,
      verifiers: contracts.paypalReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      color: '#0070BA',
      sendLink: (options) => {
        if (options.qrCode) {
          return `paypal://`
        }
        return `https://www.paypal.com/myaccount/transfer/homepage`
      },
      list: [
        SUPPORTED_CURRENCIES.USD.contractId,
        SUPPORTED_CURRENCIES.EUR.contractId,
        SUPPORTED_CURRENCIES.GBP.contractId,
        SUPPORTED_CURRENCIES.AUD.contractId,
        SUPPORTED_CURRENCIES.NZD.contractId,
        SUPPORTED_CURRENCIES.CAD.contractId,
        SUPPORTED_CURRENCIES.SGD.contractId,
      ],
    },
    monzo: {
      key: providers.MONZO,
      icon: 'simple-icons:monzo',
      name: 'Monzo',
      usernameType: 'Monzo Me Username',
      validationKey: providerKeyToValidationKey.monzo,
      verifiers: contracts.monzoReclaimVerifier,
      limits: {
        min: 1.0,
      },
      subProviders: new Set(),
      sendLink: (options) => `https://monzo.me/${options.username}`,
      list: [
        SUPPORTED_CURRENCIES.GBP.contractId,
      ],
      color: '#FC427B',
    },
    manual: {
      key: providers.MANUAL,
      icon: 'mdi:help-circle',
      name: 'Manual Release',
      color: 'gray',
      usernameType: '',
      validationKey: null,
      verifiers: [zeroAddress],
      limits: {
        min: 0.0,
      },
      subProviders: new Set(),
      list: [],
    },
  } as Record<ProviderKey, PaymentConfig>
}

/** Payment verifier to key map */
export const paymentVerifierToKey = (chainId: ChainId | null) => (
  new Map<string, ProviderKey>(
    Object.values(chainId ? [chainId] : [...contractsByChainId.keys()]).flatMap(chainId => (
      Object.values(providerConfigs(chainId)).flatMap(config => {
        return config.verifiers.map(verifier => [getAddress(verifier), config.key])
      })
    ))
  )
)

/** Provider key to verifiers map */
export const providerKeyToVerifiersMap = (chainId: ChainId) => (
  new Map<ProviderKey, Hex[]>(
    Object.entries(providerConfigs(chainId)).map(([key, config]) => (
      [key, config.verifiers] as [ProviderKey, Hex[]]
    ))
  )
)

/** Provider key to verifiers */
export const providerKeyToVerifiers = (chainId: ChainId, providerKey: ProviderKey): Hex[] | null => {
  return providerKeyToVerifiersMap(chainId).get(providerKey) ?? null
}

/** Verifier gets key */
export const verifierGetsKey = (chainId: ChainId | null, verifierAddress: string): ProviderKey => {
  try {
    return paymentVerifierToKey(chainId).get(getAddress(verifierAddress)) ?? providers.MANUAL
  } catch (error) {
    return providers.MANUAL
  }
}

/**
 * Utility function to get payment method icon
 * @param key - The provider key
 * @returns The icon string used for iconify
 */
export const getPaymentIcon = (chainId: ChainId | null, key: ProviderKey): string => {
  const config = providerConfigs(chainId ?? pulsechain.id)
  return config[key]?.icon || config[providers.MANUAL].icon
}

/**
 * Utility function to get payment method configuration by verifier address
 * @param verifierAddress - The verifier address
 * @returns The payment method configuration
 */
export const getPaymentMethodConfig = (chainId: ChainId | null, verifierAddress: string): PaymentConfig | null => {
  return (chainId ? [chainId] : [...contractsByChainId.keys()]).reduce((result, chainId) => (
    result ?? Object.values(providerConfigs(chainId)).reduce((r, config) => (
      r ?? (config.verifiers.includes(getAddress(verifierAddress)) ? config : null)
    ), result as null | PaymentConfig)
  ), null as null | PaymentConfig)
}

/**
 * Utility function to get payment method minimum limit by verifier address
 * @param key - The provider key
 * @returns The minimum limit
 */
export const getPaymentMethodMinimum = (chainId: ChainId | null, key: ProviderKey): number => {
  const config = providerConfigs(chainId ?? base.id)[key]
  return config?.limits?.min ?? 0
}

/**
 * Utility function to get payment method name by verifier address
 */
export const getPaymentMethodName = (chainId: ChainId | null, verifierAddress: string | ProviderKey): string => {
  const providerKey = verifierAddress as ProviderKey
  const providerConfig = providerConfigs(chainId ?? base.id)[providerKey]
  if (providerConfig) {
    return providerConfig.name
  }
  const config = providerConfigs(chainId ?? base.id)[verifierAddress as ProviderKey] ?? getPaymentMethodConfig(chainId ?? base.id, verifierAddress)
  return config?.name || 'Unknown'
}

/**
 * Calculate effective minimum amount (higher of user minimum or payment provider minimum)
 * @param userMinAmountWei - The user minimum amount
 * @param tokenInfo - The token info
 * @param providerRates - The provider rates
 * @returns The effective minimum amount
 */
export function calculateEffectiveMinimum(
  chainId: ChainId,
  userMinAmountWei: string | bigint,
  tokenInfo: TokenInfo,
  providerRates?: ProviderRates<ConversionRateInfo>
): {
  userMinAmountWei: bigint
  providerMinAmountWei: bigint
  effectiveMinAmountWei: bigint
  formattedEffectiveMin: string
} {
  const userMinAmountWeiBigInt = BigInt(userMinAmountWei)
  let providerMinAmountWei = 0n

  if (providerRates) {
    // Get unique payment providers from the rates
    const paymentProviders = new Set<ProviderKey>()
    for (const [providerKey] of providerRates.entries()) {
      paymentProviders.add(providerKey)
    }

    // Calculate the highest provider minimum limit
    for (const providerKey of paymentProviders) {
      const providerConfig = providerConfigs(chainId)[providerKey]
      if (providerConfig?.limits?.min) {
        const providerMinWei = parseUnits(providerConfig.limits.min.toString(), tokenInfo.decimals)
        if (providerMinWei > providerMinAmountWei) {
          providerMinAmountWei = providerMinWei
        }
      }
    }
  }

  const effectiveMinAmountWei = userMinAmountWeiBigInt > providerMinAmountWei
    ? userMinAmountWeiBigInt
    : providerMinAmountWei

  const formattedEffectiveMin = formatUnits(effectiveMinAmountWei, { decimals: tokenInfo.decimals })
  return {
    userMinAmountWei: userMinAmountWeiBigInt,
    providerMinAmountWei,
    effectiveMinAmountWei,
    formattedEffectiveMin
  }
}

/**
 * Helper function to get payment provider minimum limit (returns decimal number for config)
 * @param key - The provider key
 * @returns The minimum limit
 */
export function getPaymentProviderMinimum(chainId: ChainId, key: ProviderKey): number {
  return getPaymentMethodMinimum(chainId, key) ?? 0
}

/**
 * Check if a payment method is known
 * @param chainId - The chain ID
 * @param verifierAddress - The verifier address
 * @returns True if the payment method is known, false otherwise
 */
export const isPaymentMethodKnown = (chainId: ChainId | null, verifierAddress: string): boolean => {
  return !!getPaymentMethodConfig(chainId, verifierAddress)
}

/**
 * Get all payment methods
 * @returns All payment methods
 */
export const getAllPaymentMethods = (chainId: ChainId): ProviderKey[] => {
  return Object.keys(providerConfigs(chainId)) as ProviderKey[]
}

/**
 * Get all verifiable payment methods
 * @returns All verifiable payment methods
 */
export const verifiablePaymentMethods = (chainId: ChainId): ProviderKey[] => {
  return getAllPaymentMethods(chainId).filter(key => key !== providers.MANUAL)
}
