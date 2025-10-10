import {
  createPublicClient, getAddress, http, type Chain
} from 'viem'
import { base, pulsechain } from 'viem/chains'
import { chains, type ChainId } from './chain.js'

/**
 * Complete token information including address, symbol, name, and decimals.
 * This is the root interface for all token-related operations.
 */
export interface TokenInfo {
  address: string
  decimals: number
  symbol: string
  name: string
  chainId: ChainId
  mainnetAddress?: string
}

const BASE_USDC = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  decimals: 6,
  symbol: 'USDC',
  name: 'USD Coin',
  chainId: base.id,
} as TokenInfo

export const PULSECHAIN_USDC = {
  address: '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07',
  decimals: 6,
  symbol: 'USDC',
  name: 'USD Coin from Ethereum',
  chainId: pulsechain.id,
  mainnetAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
} as TokenInfo

/** All tokens info */
export const allTokensInfo = {
  [base.id]: {
    // Base Network Tokens
    USDC: BASE_USDC,
    // USDT: {
    //   address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    //   decimals: 6,
    //   symbol: 'USDT',
    //   name: 'Tether USD',
    //   chainId: base.id,
    // } as TokenInfo,
    // ETH: {
    //   address: '0x4200000000000000000000000000000000000006',
    //   decimals: 18,
    //   symbol: 'WETH',
    //   name: 'Wrapped Ether',
    //   chainId: base.id,
    // } as TokenInfo,
  },

  // [mainnet.id]: {
  //   // Ethereum Mainnet Tokens
  //   USDC: {
  //     address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  //     decimals: 6,
  //     symbol: 'USDC',
  //     name: 'USD Coin',
  //     chainId: mainnet.id,
  //   } as TokenInfo,
    // USDT: {
    //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    //   decimals: 6,
    //   symbol: 'USDT',
    //   name: 'Tether USD',
    //   chainId: mainnet.id,
    // } as TokenInfo,
    // WETH: {
    //   address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    //   decimals: 18,
    //   symbol: 'WETH',
    //   name: 'Wrapped Ether',
    //   chainId: mainnet.id,
    // } as TokenInfo,
    // ETH: {
    //   address: zeroAddress,
    //   decimals: 18,
    //   symbol: 'ETH',
    //   name: 'Ether',
    //   chainId: mainnet.id,
    // } as TokenInfo,
    // DAI: {
    //   address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //   decimals: 18,
    //   symbol: 'DAI',
    //   name: 'Dai Stablecoin',
    //   chainId: mainnet.id,
    // } as TokenInfo,
  // },
  [pulsechain.id]: {
    USDC: PULSECHAIN_USDC,
  },
    // USDT: {
    //   address: '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f',
    //   decimals: 6,
    //   symbol: 'USDT',
    //   name: 'Tether USD from Ethereum',
    //   chainId: pulsechain.id,
    //   mainnetAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    // } as TokenInfo,
    // ETH: {
    //   address: '0x02DcdD04e3F455D838cd1249292C58f3B79e3C3C',
    //   decimals: 18,
    //   symbol: 'WETH',
    //   name: 'Wrapped Ether from Ethereum',
    //   chainId: pulsechain.id,
    //   mainnetAddress: '0x0000000000000000000000000000000000000000',
    // } as TokenInfo,
} as Record<ChainId, Record<string, TokenInfo>>

export const getDefaultToken = (chainId: ChainId | null) => {
  return allTokensInfo[chainId ?? pulsechain.id]?.USDC ?? null
}

export const getDefaultTokens = (chainIds: ChainId[]) => {
  return chainIds.length ? chainIds.map((chainId) => getDefaultToken(chainId)) : chains.map((chain) => getDefaultToken(chain.id))
}

/**
 * Get tokens by chain ID
 * @param chainId - The chain ID
 * @returns Array of tokens for that chain
 */
export const getTokensByChainId = (chainId: ChainId): TokenInfo[] => {
  return Object.values(allTokensInfo[chainId] ?? {})
}

/**
 * Get a token by address
 * @param address - The address of the token
 * @returns The token info
 */
export const tokenByAddress = (chainId: ChainId, address: string | undefined): TokenInfo | null => {
  return !address ? null : Object.values(allTokensInfo[chainId] ?? {}).find(token => getAddress(token.address) === getAddress(address)) ?? null
}

/**
 * Create a public client for reading from contracts
 * @param chain - The chain
 * @returns The public client
 */
export const publicClient = (chain: Chain) => createPublicClient({
  chain,
  transport: http()
})

// export const pulseChainTokenToMainnet = (pulsechainToken: TokenInfo) => {
//   const tokens = allTokensInfo[mainnet.id]
//   const token = Object.values(tokens).find((t) => (
//     getAddress(t.address) === getAddress(pulsechainToken.mainnetAddress!)
//   ))
//   return token!
// }
