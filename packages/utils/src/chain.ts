import { base, pulsechain, type Chain } from 'viem/chains'

pulsechain.blockExplorers = {
  default: {
    name: 'PulseScan',
    url: 'https://ipfs.scan.pulsechain.com' as unknown as 'https://scan.pulsechain.com',
    apiUrl: 'https://api.scan.pulsechain.com/api',
  },
} as const

export const chains = [pulsechain, base] as const

export const chainIds = chains.map((chain) => chain.id)

export type ChainId = (typeof chainIds)[number]

/**
 * Get the explorer URL for a given chain, type, and hash
 * @param chain - The chain to get the explorer URL for
 * @param type - The type of explorer to use (tx or address)
 * @param hash - The hash to get the explorer URL for
 * @returns The explorer URL
 */
export function getExplorerUrl(chain: Chain, type: 'tx' | 'address', hash: string) {
  return `${chain.blockExplorers?.default.url}/${type}/${hash}`
}

export const chainIdToChain = new Map<ChainId, Chain>(
  chains.map((chain) => [chain.id, chain] as const)
)

export const chainIdToTargetBlockTime = new Map<number, number>([
  [369, 10_000],
  [8453, 2_000],
])
