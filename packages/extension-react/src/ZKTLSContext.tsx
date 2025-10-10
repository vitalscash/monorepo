import { createContext, useContext, type ReactNode } from 'react'
import { useZKTLS } from './useZKTLS'

type ZKTLSContextType = ReturnType<typeof useZKTLS>

const ZKTLSContext = createContext<ZKTLSContextType | undefined>(undefined)

interface ZKTLSProviderProps {
  children: ReactNode
  fallbackComponent?: ReactNode
}

export function ZKTLSProvider({ children, fallbackComponent }: ZKTLSProviderProps) {
  const zktlsHook = useZKTLS()

  // Show loading state until ZKTLS is initialized
  if (!zktlsHook.isInitialized && fallbackComponent !== undefined) {
    return fallbackComponent
  }
  return (
    <ZKTLSContext.Provider value={zktlsHook}>
      {children}
    </ZKTLSContext.Provider>
  )
}

export function useZKTLSContext() {
  const context = useContext(ZKTLSContext)
  if (context === undefined) {
    throw new Error('useZKTLSContext must be used within a ZKTLSProvider')
  }
  return context
}
