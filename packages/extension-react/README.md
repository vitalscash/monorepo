# @vitals/extension-react

React hooks and context providers for integrating with the ZKTLS (Zero-Knowledge Transport Layer Security) browser extension.

## Overview

This package provides React components and hooks that enable web applications to communicate with the ZKTLS browser extension for generating cryptographic proofs of payments. It handles the bridge between your React application and the browser extension, allowing users to prove they made payments through traditional payment providers without revealing sensitive account information.

## Installation

```bash
npm install @vitals/extension-react
```

## Quick Start

### 1. Wrap your app with the ZKTLS Provider

```typescript
import { ZKTLSProvider } from '@vitals/extension-react'

function App() {
  return (
    <ZKTLSProvider fallbackComponent={<div>Loading ZKTLS...</div>}>
      <YourApp />
    </ZKTLSProvider>
  )
}
```

### 2. Use the ZKTLS context in your components

```typescript
import { useZKTLSContext } from '@vitals/extension-react'

function PaymentProofComponent() {
  const zktls = useZKTLSContext()

  const handleGenerateProof = async () => {
    if (!zktls.isInitialized) {
      console.log('ZKTLS extension not ready')
      return
    }

    try {
      // Request connection to extension
      await zktls.requestConnection()

      // Authenticate with payment provider
      const metadata = await zktls.authenticate({
        actionType: 'transfer_venmo',
        platform: 'venmo'
      })

      // Generate cryptographic proof
      const proofs = await zktls.generateProofSeries({
        platform: 'venmo',
        provider: 'venmo',
        intentHash: '0x1234...',
        originalIndex: 0
      })

      console.log('Proofs generated:', proofs)
    } catch (error) {
      console.error('Proof generation failed:', error)
    }
  }

  return (
    <button onClick={handleGenerateProof}>
      Generate Payment Proof
    </button>
  )
}
```

## API Reference

### `useZKTLS()` Hook

The main hook that provides all ZKTLS functionality. Returns an object with the following methods:

#### Connection Management
- `isInitialized: boolean` - Whether the ZKTLS extension is initialized
- `requestConnection(): Promise<boolean>` - Request connection to the extension
- `checkConnectionStatus(): Promise<Status>` - Check current connection status
- `getVersion(): Promise<string>` - Get extension version

#### Authentication & Proof Generation
- `authenticate(inputs: AuthenticationInputs): Promise<MetadataMessageResponse>` - Authenticate with a payment provider
- `generateProof(inputs: HexIntentGenerateProofInputs): Promise<GenerateProofResponse>` - Generate a single proof
- `generateProofSeries(inputs, mutations): Promise<NotaryRequest[]>` - Generate multiple proofs for complex verification
- `waitForProof(proofId: string): Promise<NotaryRequest>` - Wait for proof generation to complete

#### Proof Management
- `fetchProofById(proofId: string): Promise<NotaryRequest | null>` - Fetch a specific proof
- `fetchProofs(): Promise<FetchProofsResponse>` - Fetch all generated proofs
- `fetchGeneratedProofs(responses: GenerateProofResponse[]): Promise<NotaryRequest[]>` - Fetch multiple proofs by their responses

#### Extension Integration
- `openSidebar(route: string): Promise<void>` - Open the extension sidebar
- `onMetadataMessage(callback): () => void` - Subscribe to metadata messages

### `ZKTLSProvider` Component

React context provider that makes ZKTLS functionality available to child components.

**Props:**
- `children: ReactNode` - Child components
- `fallbackComponent?: ReactNode` - Component to show while ZKTLS is initializing

### `useZKTLSContext()` Hook

Hook to access the ZKTLS context within components. Must be used within a `ZKTLSProvider`.

**Returns:** The same object as `useZKTLS()`

**Throws:** Error if used outside of `ZKTLSProvider`

## Supported Payment Providers

The extension supports proof generation for the following payment providers:

- **Venmo** - Single proof generation
- **Zelle** - Multiple proof generation (supports Chase, Bank of America, Citi sub-providers)
- **CashApp** - Single proof generation
- **Revolut** - Single proof generation
- **Wise** - Single proof generation
- **MercadoPago** - Single proof generation

## Advanced Usage

### Progress Tracking for Proof Series

```typescript
const generateProofWithProgress = async () => {
  await zktls.generateProofSeries(
    {
      platform: 'chase',
      provider: 'zelle',
      intentHash: '0x1234...',
      originalIndex: 0
    },
    {
      progress: ({ progress, step, id, total }) => {
        console.log(`Step ${step + 1}/${total}: ${progress}`)
        if (id) console.log(`Proof ID: ${id}`)
      }
    }
  )
}
```

### Metadata Message Handling

```typescript
useEffect(() => {
  const unsubscribe = zktls.onMetadataMessage((data) => {
    console.log('Payment metadata:', data.metadata)
    console.log('Platform:', data.platform)
    console.log('Request ID:', data.requestId)
  })

  return unsubscribe
}, [zktls])
```

### Finding Matching Payment Metadata

```typescript
import { findMetadataMessage } from '@vitals/extension-react'

const matchingMessage = findMetadataMessage({
  metadata: paymentMetadata,
  intent: userIntent,
  token: tokenInfo
})
```

## Proof Encoding Utilities

The package includes utilities for encoding proofs for blockchain submission:

```typescript
import {
  encodeProofAsBytes,
  encodeTwoProofs,
  encodeProof
} from '@vitals/extension-react'

// Encode single proof
const encodedProof = encodeProofAsBytes(reclaimProof)

// Encode multiple proofs (for Zelle/Chase)
const encodedProofs = encodeTwoProofs(proof1, proof2)

// High-level encoding based on provider
const encoded = encodeProof({
  extensionProofs: notarizedProofs,
  subProvider: 'chase',
  provider: 'zelle'
})
```

## Error Handling

Always wrap ZKTLS calls in try-catch blocks:

```typescript
const handleProofGeneration = async () => {
  try {
    const proofs = await zktls.generateProofSeries(inputs)
    // Handle success
  } catch (error) {
    if (error.message.includes('failed')) {
      // Handle proof generation failure
    } else if (error.message.includes('cancelled')) {
      // Handle user cancellation
    } else {
      // Handle other errors
    }
  }
}
```

## Types

The package exports TypeScript types for all major interfaces:

```typescript
import type {
  Status,
  MetadataMessage,
  MetadataMessageResponse,
  GenerateProofInputs,
  GenerateProofResponse,
  AuthenticationInputs,
  NotaryRequest,
  ReclaimProof
} from '@vitals/extension-react'
```

## Dependencies

- **React** ^18.2.0 (peer dependency)
- **@vitals/utils** - Shared utilities package
- **viem** - Ethereum utilities for encoding

## Browser Extension Requirement

This package requires users to have the ZKTLS browser extension installed. The extension handles all cryptographic operations and secure communication with payment providers.

## Security Notes

- All sensitive operations are handled by the browser extension
- No private keys or sensitive data are exposed to the web application
- Zero-knowledge proofs ensure payment verification without revealing account details
- All proof generation happens locally in the user's browser
