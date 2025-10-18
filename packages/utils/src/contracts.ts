import { getAddress, type Hex } from 'viem'
import { base, pulsechain } from 'viem/chains'
import type { ChainId } from './chain.js'

/**
 * Contracts for the app
 */
export type Contracts = {
  gatingService: Hex
  usdc: Hex
  escrow: Hex[]
  venmoReclaimVerifier: Hex[]
  revolutReclaimVerifier: Hex[]
  cashappReclaimVerifier: Hex[]
  wiseReclaimVerifier: Hex[]
  mercadopagoReclaimVerifier: Hex[]
  zelleBaseVerifier: Hex[]
  zelleBoAReclaimVerifier: Hex[]
  zelleChaseReclaimVerifier: Hex[]
  zelleCitiReclaimVerifier: Hex[]
  paypalReclaimVerifier: Hex[]
  monzoReclaimVerifier: Hex[]
}

export const reclaimSigners = {
  zkp2pWitnessSigner: '0x0636c417755E3ae25C6c166D181c0607F4C572A3',
  reclaimWitnessSigner: '0x244897572368eadf65bfbc5aec98d8e5443a9072',
} as const

export const baseContracts = {
  gatingService: getAddress('0x396D31055Db28C0C6f36e8b36f18FE7227248a97'),
  usdc: getAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'),
  escrow: [getAddress('0xCA38607D85E8F6294Dc10728669605E6664C2D70')],
  venmoReclaimVerifier: [getAddress('0x9a733B55a875D0DB4915c6B36350b24F8AB99dF5')],
  revolutReclaimVerifier: [getAddress('0xAA5A1B62B01781E789C900d616300717CD9A41aB')],
  cashappReclaimVerifier: [getAddress('0x76D33A33068D86016B806dF02376dDBb23Dd3703')],
  wiseReclaimVerifier: [getAddress('0xFF0149799631D7A5bdE2e7eA9b306c42b3d9a9ca')],
  mercadopagoReclaimVerifier: [
    // getAddress('0x00d003c73eab8feaec04bab976235915fe7641e3'),
    getAddress('0xf2AC5be14F32Cbe6A613CFF8931d95460D6c33A3'),
  ],
  zelleBaseVerifier: [
    // getAddress('0x1783f040783c0827fb64d128ece548d9b3613ad5'),
    getAddress('0x431a078A5029146aAB239c768A615CD484519aF7'),
  ],
  zelleChaseReclaimVerifier: [getAddress('0xBcD7C6BBcA5869fBefe3E322263EE1090221D7A9')],
  zelleBoAReclaimVerifier: [getAddress('0x809c7A20A2dbBB3210fC73Dd7C01Cd7Fa70C195F')],
  zelleCitiReclaimVerifier: [getAddress('0x3128badc46dbe2e37bdd2d64f33fb3b3a639570e')],
  paypalReclaimVerifier: [getAddress('0x03d17E9371C858072E171276979f6B44571C5DeA')],
  monzoReclaimVerifier: [getAddress('0x0dE46433bD251027f73eD8f28E01eF05DA36a2E0')],
} as Contracts

export const pulsechainContracts = {
  gatingService: getAddress('0x4Bd6364FCC4D8A537aBfee33B16E959794fDf9Cf'),
  usdc: getAddress('0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07'),
  escrow: [getAddress('0x2932E08BFD212Ef0732257bDd6463BF55E9b97d7')],
  cashappReclaimVerifier: [getAddress('0x9224433D6AD9a5A774ca74Ca33c01747FA710A9d')],
  mercadopagoReclaimVerifier: [getAddress('0xc4D0cf4DF12e329f9c951d1D9BB815da6138850A')],
  monzoReclaimVerifier: [getAddress('0xBde2c79c1897459e66C0fdF6764EED0c6839C878')],
  nullifierRegistry: [getAddress('0x471D3c6C9E32CE2556d0117aC161Aa82AEac17d8')],
  paypalReclaimVerifier: [getAddress('0x1DdBfd39a141C5A2329d849CADa6a83404E0Ce4F')],
  revolutReclaimVerifier: [getAddress('0x8234AA463C8B94778f58eA0bFEfcBAC3683341A9')],
  venmoReclaimVerifier: [getAddress('0x0Dd524dA03f610480aF3F433B411b6016cFBDeab')],
  wiseReclaimVerifier: [getAddress('0x7B72d7CfAfDfD397E2460c933e84D16dc121845a')],
  zelleBaseVerifier: [getAddress('0x539566771f9c38c6038aafc1946bf11af9cdb201')],
  zelleBoAReclaimVerifier: [getAddress('0x506a746b8228F9f9d4522105b973Dc7223A64EAC')],
  zelleChaseReclaimVerifier: [getAddress('0xB0aA0a58959465bBCf0eCbD62A84B743A5435c99')],
  zelleCitiReclaimVerifier: [getAddress('0x5624E479924eBFb25B51F36e3FDaE605dADb448b')],
} as Contracts

export const contractsByChainId = new Map<ChainId, Contracts>([
  [base.id, baseContracts],
  [pulsechain.id, pulsechainContracts],
])

export const getContracts = (chainId: ChainId) => {
  return contractsByChainId.get(chainId) ?? null
}

export const getLatestContract = (chainId: ChainId, key: keyof Contracts) => {
  const contracts = getContracts(chainId)
  if (!contracts) return null
  const target = contracts[key]
  if (!target) return null
  if (Array.isArray(target)) {
    return target[target.length - 1] ?? null
  }
  return target
}
