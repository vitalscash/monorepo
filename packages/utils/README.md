# @vitals/utils

Shared utility functions, types, and constants for the Vitals Cash ecosystem. This package provides core business logic for currency operations, payment processing, token management, and blockchain interactions.

## Installation

```bash
npm install @vitals/utils
```

## Overview

The utils package is the foundation of the Vitals Cash system, providing:

- **Currency Management** - Support for multiple fiat currencies with automatic contract ID generation
- **Payment Provider Integration** - Configuration and utilities for various payment platforms
- **Token Management** - Blockchain token utilities and amount calculations
- **Conversion Rate Handling** - Exchange rate processing and currency conversions
- **Time & Formatting Utilities** - Date/time formatting and number display utilities
- **Smart Contract Integration** - Contract addresses and blockchain utilities

## Usage

### Currency Operations

```typescript
import {
  getCurrencyInfo,
  Currency,
  formatCurrencyAmount,
  SUPPORTED_CURRENCIES
} from '@vitals/utils/currencies'

// Get currency information
const usdInfo = getCurrencyInfo('USD')
console.log(usdInfo.symbol) // '$'
console.log(usdInfo.decimals) // 2

// Create new currency
const customCurrency = new Currency('GBP', '£', 'British Pound', 2)

// Format currency amounts
const formatted = formatCurrencyAmount(1234.56, 'USD') // '$1,234.56'

// Check supported currencies
console.log(Object.keys(SUPPORTED_CURRENCIES)) // ['USD', 'EUR', 'GBP', ...]
```

### Payment Provider Configuration

```typescript
import {
  providers,
  subProviders,
  providerKeyToValidationKey
} from '@vitals/utils/payment'

// Available providers
console.log(providers.VENMO) // 'venmo'
console.log(providers.ZELLE) // 'zelle'

// Sub-providers (for Zelle banking partners)
console.log(subProviders.CHASE) // 'chase'

// Validation keys for each provider
console.log(providerKeyToValidationKey.venmo) // 'venmoUsername'
```

### Token Management

```typescript
import {
  allTokensInfo,
  tokenByAddress,
} from '@vitals/utils/tokens'

// Get token info
const usdc = allTokensInfo.BASE.USDC
console.log(usdc.decimals) // 6

// Find token by address
const token = tokenByAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913')
```

### Conversion Rate Processing

```typescript
import {
  processConversionRates,
  convertTokenInputToCurrency,
  convertCurrencyToTokenOutput,
  getPrimaryConversionRate
} from '@vitals/utils/conversionRates'

// Process conversion rate events
const providerRates = processConversionRates({
  events: conversionRateEvents,
  sortOrder: 'desc'
})

// Convert token amount to currency
const currencyAmount = convertTokenInputToCurrency({
  token: { decimals: 6 },
  amountOutInt: parseUnits('100', 6), // 100 USDC
  rate: parseUnits('1', 18) // 1:1 rate
})

// Convert currency to token output
const tokenAmount = convertCurrencyToTokenOutput({
  token: { decimals: 6 },
  currencyAmountInt: parseUnits('100', 2), // $100
  rate: parseUnits('1', 18)
})
```

### Time and Formatting Utilities

```typescript
import {
  formatTimestamp,
  formatDuration,
  interval,
  sleep
} from '@vitals/utils/time'
import {
  formatUnits,
  addThousandsSeparator,
  parseUnits
} from '@vitals/utils/units'

// Format timestamps
const timeAgo = formatTimestamp(Date.now() - interval.hour) // '1h ago'

// Format durations
const duration = formatDuration({
  from: new Date('2023-01-01'),
  to: new Date('2023-01-02')
}) // '1 day'

// Format numbers with separators
const formatted = addThousandsSeparator('1234567') // '1,234,567'

// Format token amounts
const displayAmount = formatUnits(parseUnits('1234.56', 6), {
  decimals: 6,
  truncateDecimals: 2
}) // '1,234.56'

// Sleep utility
await sleep(1000) // Wait 1 second
```

### Smart Contract Integration

```typescript
import { contracts } from '@vitals/utils/contracts'

// Contract addresses
console.log(contracts.usdc) // USDC token contract
console.log(contracts.escrow) // Main escrow contract
console.log(contracts.venmoReclaimVerifier) // Venmo proof verifier
console.log(contracts.zelleBaseVerifier) // Zelle proof verifier
```

### Intent Management

```typescript
import type { IntentStruct } from '@vitals/utils/intent'

const intent: IntentStruct = {
  owner: '0x...',           // Intent creator
  to: '0x...',             // Payment recipient
  depositId: 123n,         // Associated deposit
  amount: parseUnits('100', 6), // Payment amount
  timestamp: BigInt(Date.now() / 1000), // Creation time
  paymentVerifier: '0x...', // Verifier contract
  fiatCurrency: '0x...',   // Currency identifier
  conversionRate: parseUnits('1', 6) // Exchange rate
}
```

## Available Modules

### Core Modules

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `currencies` | Currency management | `getCurrencyInfo`, `formatCurrencyAmount`, `Currency` class |
| `payment` | Provider configuration | Provider constants, validation utilities |
| `tokens` | Token operations | `tokenByAddress`, amount comparisons |
| `conversionRates` | Rate processing | `processConversionRates`, conversion utilities |
| `time` | Time formatting | `formatTimestamp`, `formatDuration`, `sleep` |
| `units` | Number formatting | `formatUnits`, `addThousandsSeparator` |
| `contracts` | Smart contracts | Contract address constants |
| `intent` | Intent structures | TypeScript interfaces |

### Utility Modules

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `sort` | Sorting utilities | `orderedSort`, `orderedSortThenById` |
| `profit` | Profit calculations | `calculateProfit`, `calculateProfits` |
| `participants` | User identification | `generateParticipantId` |
| `input` | Input processing | `adjustLowestDecimal` |
| `json` | JSON handling | `jsonSerializer`, `mapBigIntFields` |
| `chain` | Blockchain utilities | `getExplorerUrl`, chain configurations |

## Supported Currencies

The package supports the following fiat currencies:

- **USD** (US Dollar) - $
- **EUR** (Euro) - €
- **GBP** (British Pound) - £
- **CAD** (Canadian Dollar) - C$
- **AUD** (Australian Dollar) - A$
- **JPY** (Japanese Yen) - ¥
- **CHF** (Swiss Franc) - Fr
- **CNY** (Chinese Yuan) - ¥
- **INR** (Indian Rupee) - ₹
- **BRL** (Brazilian Real) - R$
- **MXN** (Mexican Peso) - $
- **ARS** (Argentine Peso) - $

## Supported Payment Providers

- **Venmo** (`venmo`)
- **Zelle** (`zelle`) with sub-providers:
  - Chase (`chase`)
  - Bank of America (`bank_of_america`)
  - Citi (`citi`)
- **CashApp** (`cashapp`)
- **Revolut** (`revolut`)
- **Wise** (`wise`)
- **MercadoPago** (`mercadopago`)
- **Manual** (`manual`)

## Smart Contract Addresses

The package includes contract addresses for:

- **Token Contracts**: USDC
- **Core Contracts**: Escrow, Relay Bridge
- **Verifier Contracts**: Individual verifiers for each payment provider
- **Service Contracts**: Gating service, witness signers

## TypeScript Support

All modules are fully typed with TypeScript interfaces and types exported for use in your applications:

```typescript
import type {
  CurrencyInfo,
  TokenInfo,
  IntentStruct,
  ConversionRateInfo,
  ProviderKey,
  SortDirection
} from '@vitals/utils'
```

## Build System

The package uses TypeScript compilation and ES modules:

```bash
npm run build  # Compile TypeScript to JavaScript
```

## Dependencies

- **viem** - Ethereum utilities for address handling and encoding
- Built-in JSON data for country and currency information

## Contributing

When adding new utilities:

1. Create focused modules for specific functionality
2. Export functions through the main index file
3. Include TypeScript types and interfaces
4. Follow the existing naming conventions
5. Add comprehensive JSDoc comments

## License

ISC License
