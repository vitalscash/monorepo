import { createContext, useContext, type ReactNode } from 'react'
import { useZKTLS } from './useZKTLS'

type ZKTLSContextType = ReturnType<typeof useZKTLS>

const ZKTLSContext = createContext<ZKTLSContextType | undefined>(undefined)

interface ZKTLSProviderProps {
  children: ReactNode
}

export function ZKTLSProvider({ children }: ZKTLSProviderProps) {
  const zktlsHook = useZKTLS()

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
