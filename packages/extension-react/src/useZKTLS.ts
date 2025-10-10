import { useEffect, useMemo, useState } from "react"
import { encodeAbiParameters, encodePacked, parseAbiParameter, parseUnits, type Hex } from "viem"
import { interval, sleep } from "@vitals/utils/time"
import type { IntentStruct } from "@vitals/utils/intent"
import type { TokenInfo } from "@vitals/utils/tokens"
import { providers, subProviderConfigs, subProviders, type ActionType, type PlatformKey, type ProviderKey, type SubProviderKey } from "@vitals/utils/payment"
import { convertTokenInputToCurrency } from "@vitals/utils/conversionRates"

declare global {
  interface ZKTLS {
    requestConnection(): Promise<boolean>
    checkConnectionStatus(): Promise<Status>
    getVersion(): Promise<string>
    authenticate(inputs: AuthenticationInputs): Promise<void>
    generateProof(inputs: GenerateProofInputs): Promise<GenerateProofResponse>
    fetchProofById(proofId: string): Promise<ProofResponse>
    fetchProofs(): Promise<FetchProofsResponse>
    openSidebar(route: string): Promise<void>
    onMetadataMessage(fn: (data: MetadataMessageResponse) => void): () => void
  }
  interface Window {
    zktls: ZKTLS | undefined
  }
}

/** the status of the zktls extension */
export type Status = 'connected' | 'disconnected' | 'pending'

/** the individual metadata message sent by the zktls extension */
export interface MetadataMessage {
  amount: number
  date: string
  hidden: boolean
  originalIndex: number
  paymentId: number
  recipient: string
}

/** the response from the zktls extension when a metadata message is received */
export interface MetadataMessageResponse {
  expiresAt: number
  platform: ProviderKey
  requestId: string
  metadata: MetadataMessage[]
}

/** the response from the zktls extension when fetching proofs */
export interface FetchProofsResponse {
  notaryRequests: NotaryRequest[]
}

/** the inputs for the generateProof function */
export type GenerateProofInputsAbstracted = {
  platform: PlatformKey
  provider: ProviderKey
  intentHash: Hex
  originalIndex: number
}

/** the inputs for the generateProof function */
export type GenerateProofInputs = {
  platform: ProviderKey
  originalIndex: number
  proofIndex?: number
  intentHash: string
}

/**
 * inputs for the generate proof function that requires the intent hash
 * as hex to ensure it can be converted to a bigint string accurately
 */
export type HexIntentGenerateProofInputs = Exclude<GenerateProofInputs, 'intentHash'> & { intentHash: Hex }

/** the response from the zktls extension when generating a proof */
export type GenerateProofResponse = {
  proofId: string
  platform: ProviderKey
}

/** the inputs for the authenticate function */
export type AuthenticationInputs = {
  actionType: ActionType
  platform: PlatformKey
}

/** the response from the zktls extension when fetching a proof */
export interface Proof {
  claimInfo: ClaimInfo
  signedClaim: SignedClaim
  isAppclipProof: boolean
  status: string
}

/** the response from the zktls extension when fetching a proof */
export interface NotarizedProof {
  claim: {
    context: string
    epoch: number
    identifier: Hex
    owner: Hex
    parameters: string
    provider: string
    timestampS: number
  },
  signatures: {
    attestorAddress: Hex
    claimSignature: Record<number, number>
    resultSignature: Record<number, number>
  },
}

/** the claim info for a proof */
export interface ClaimInfo {
  provider: string
  parameters: string
  context: string
}

/** the complete claim data for a proof */
export interface CompleteClaimData {
  identifier: Hex
  owner: Hex
  timestampS: number
  epoch: number
}

/** the signed claim for a proof */
export interface SignedClaim {
  claim: CompleteClaimData
  signatures: Hex[]
}

/** the reclaim proof for a proof */
export type ReclaimProof = {
  claimInfo: ClaimInfo
  signedClaim: SignedClaim
  isAppclipProof: boolean
}

/** the notary request for a proof */
export interface NotaryRequest {
  metadata: (string | number)[]
  actionType: ActionType
  id: string
  status: string
  timestamp: number
  proof: NotarizedProof
}

/** the response from the zktls extension when fetching a proof */
export interface ProofResponse {
  notaryRequest: NotaryRequest
}

export const extensionUrl = 'https://chromewebstore.google.com/detail/ijpgccednehjpeclfcllnjjcmiohdjih'

/** convert a byte array to a hex string */
export const byteArrayToHexString = (byteArray: number[]): Hex => {
  return `0x${byteArray
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')}`
}

/** parse a proof object from the zktls extension */
export const parseExtensionProof = (proofObject: NotarizedProof) => {
  return {
    claimInfo: {
      provider: proofObject.claim.provider,
      parameters: proofObject.claim.parameters,
      context: proofObject.claim.context
    },
    signedClaim: {
      claim: {
        identifier: proofObject.claim.identifier as Hex,
        owner: proofObject.claim.owner as Hex,
        timestampS: proofObject.claim.timestampS,
        epoch: proofObject.claim.epoch
      },
      signatures: [byteArrayToHexString(Object.values(proofObject.signatures.claimSignature))]
    },
    isAppclipProof: false
  } as ReclaimProof
}

/** the abi encoding for a proof */
export const PROOF_ENCODING = parseAbiParameter("((string provider, string parameters, string context) claimInfo, ((bytes32 identifier, address owner, uint32 timestampS, uint32 epoch) claim, bytes[] signatures) signedClaim, bool isAppclipProof)")

/** encode a single proof as a bytes array */
export function encodeProofAsBytes(proof: ReclaimProof): Hex {
  return encodeAbiParameters([PROOF_ENCODING], [proof])
}

/** encode two proofs to be passed to the underlying sub-provider */
export const encodeTwoProofs = (proof1: ReclaimProof, proof2: ReclaimProof) => {
  return encodeAbiParameters([PROOF_ENCODING, PROOF_ENCODING], [proof1, proof2])
}

/** a high level function to encode a proof for a given provider and sub-provider */
export const encodeProof = ({ extensionProofs, subProvider, provider }: {
  extensionProofs: NotarizedProof[],
  subProvider: PlatformKey | null,
  provider: ProviderKey
}) => {
  const reclaimProofs = extensionProofs.map((p) => parseExtensionProof(p))
  if (provider === 'zelle') {
    // move this to check the blockchain for the payment method
    const paymentMethod = subProviderConfigs![provider]![subProvider as SubProviderKey]!.paymentMethod
    const twoEncoded = reclaimProofs.length === 2
      ? encodeTwoProofs(reclaimProofs[0], reclaimProofs[1])
      : encodeProofAsBytes(reclaimProofs[0])
    // select between various possible sub-providers
    const withPaymentMethod = encodeProofWithPaymentMethod({
      paymentMethod,
      proof: twoEncoded,
    })
    return withPaymentMethod
  }
  const [reclaimProof] = reclaimProofs
  return encodeProofAsBytes(reclaimProof)
}

/**
 * wrap a proof with a payment method and proof
 * this allows us to use a single verifier as an entry point for multiple underlying sub-providers
 */
export const encodeProofWithPaymentMethod = ({
  proof,
  paymentMethod
}: {
  proof: Hex,
  paymentMethod: number
}): Hex => {
  return encodePacked(['uint8', 'bytes'], [paymentMethod, proof])
}

/** the progress of a proof series */
export enum SeriesProgress {
  Generating,
  Polling,
  Complete,
}

export type ProgressInfo = {
  progress: SeriesProgress
  total: number
  step: number | null
  id: string | null
}

/** the mutations for the generate proof series function */
export type GenerateProofSeriesMutations = {
  progress?: ({ progress, step, id }: ProgressInfo) => void
  setOwnerName?: (name: string) => void
}

/** the zktls context */
export const useZKTLS = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    const setup = () => {
      setIsInitialized(true)
    }
    const eventName = 'zktls#initialized'
    if (typeof window.zktls !== 'undefined') {
      // api is available
      setup()
    } else {
      window.addEventListener(eventName, setup)
      return () => {
        window.removeEventListener(eventName, setup)
      }
    }
  }, [])
  return useMemo(() => {
    /** fetch a proof by its id */
    const fetchProofById = async (proofId: string) => {
      const proof = await window.zktls!.fetchProofById(proofId)
      if (proof && proof.notaryRequest) return proof.notaryRequest
      const proofs = await window.zktls!.fetchProofs()
      const proofFromList = proofs.notaryRequests.find((p) => p.id === proofId)
      if (proofFromList) return proofFromList
      return null
    }
    /** wait for a proof to be generated */
    const waitForProof = async (proofId: string, onCurrent?: (notaryRequest: NotaryRequest | null) => void) => {
      let notaryRequest: NotaryRequest | null = null
      do {
        notaryRequest = await fetchProofById(proofId)
        onCurrent?.(notaryRequest)
        await sleep(1_000)
      } while (!notaryRequest || !notaryRequest.status || notaryRequest.status === 'pending')
      if (notaryRequest.status === 'failed' || notaryRequest.status === 'expired' || notaryRequest.status === 'cancelled' || notaryRequest.status === 'error') {
        console.log(notaryRequest)
        throw new Error(`Proof generation failed: ${notaryRequest.status}`)
      }
      return notaryRequest
    }
    /** generate a proof */
    const generateProof = async (inputs: HexIntentGenerateProofInputs): Promise<GenerateProofResponse> => {
      return await window.zktls!.generateProof({
        proofIndex: 0,
        ...inputs,
        intentHash: BigInt(inputs.intentHash).toString(),
      })
    }
    return {
      /** check if the zktls extension is initialized */
      isInitialized,
      /** request a connection to the zktls extension */
      requestConnection: async () => {
        if (!window.zktls) return false
        return window.zktls!.requestConnection()
      },
      /**
       * check the connection status of the zktls extension
       * @returns the connection status
       */
      checkConnectionStatus: async () => {
        return await window.zktls!.checkConnectionStatus()
      },
      /** get the version of the zktls extension */
      getVersion: async () => {
        return await window.zktls?.getVersion()
      },
      /** authenticate with the zktls extension */
      authenticate: async (inputs: AuthenticationInputs) => {
        let resolve: (value: MetadataMessageResponse) => void = () => { }
        const unsub = window.zktls!.onMetadataMessage((data) => {
          console.log('metadata message', data, inputs)
          if (`transfer_${data.platform}` === inputs.actionType) {
            resolve(data)
          }
        })
        const promise = new Promise<MetadataMessageResponse>((resolver) => {
          resolve = resolver
        })
        await window.zktls!.authenticate(inputs)
        return await promise.then((data) => {
          unsub()
          return data
        })
      },
      /** generate a proof */
      generateProof,
      /** wait for a proof to be generated */
      waitForProof,
      /** generate a proof series */
      generateProofSeries: async (
        inputs: GenerateProofInputsAbstracted,
        { progress: progressCallback }: GenerateProofSeriesMutations = {},
      ): Promise<NotaryRequest[]> => {
        const { platform, provider, intentHash, originalIndex } = inputs
        const args = {
          platform: provider,
          originalIndex,
          intentHash,
        } as const
        const expectedTotal = provider === providers.ZELLE && platform === subProviders.CHASE ? 2 : 1
        progressCallback?.({ progress: SeriesProgress.Generating, step: 0, id: null, total: expectedTotal })
        const genProofA = await generateProof({ ...args, proofIndex: 0 })
        progressCallback?.({ progress: SeriesProgress.Polling, step: 0, id: genProofA.proofId, total: expectedTotal })
        const proofA = await waitForProof(genProofA.proofId)
        if (platform !== subProviders.CHASE || provider !== providers.ZELLE) {
          progressCallback?.({ progress: SeriesProgress.Complete, step: null, id: null, total: expectedTotal })
          return [proofA]
        }
        progressCallback?.({ progress: SeriesProgress.Generating, step: 1, id: null, total: expectedTotal })
        const genProofB = await generateProof({ ...args, proofIndex: 1 })
        progressCallback?.({ progress: SeriesProgress.Polling, step: 1, id: genProofB.proofId, total: expectedTotal })
        const proofB = await waitForProof(genProofB.proofId)
        progressCallback?.({ progress: SeriesProgress.Complete, step: null, id: null, total: expectedTotal })
        return [proofA, proofB]
      },
      /** subscribe to metadata messages */
      onMetadataMessage: (fn: (data: any) => void) => {
        return window.zktls!.onMetadataMessage(fn)
      },
      /** fetch a proof by its id */
      fetchProofById,
      /** fetch generated proofs */
      fetchGeneratedProofs: async (genProofResponses: GenerateProofResponse[]) => {
        return await Promise.all(genProofResponses.map((r) => fetchProofById(r.proofId)))
      },
      /** fetch all proofs */
      fetchProofs: async () => {
        return await window.zktls!.fetchProofs()
      },
      /** open the zktls sidebar */
      openSidebar: async (route: string) => {
        return await window.zktls!.openSidebar(route)
      },
    }
  }, [isInitialized])
}

/** find the metadata message that matches the intent to the best of our ability */
export const findMetadataMessage = ({ metadata, intent, token, recipient, centIsInt = false }: {
  metadata: MetadataMessage[],
  intent: IntentStruct,
  token: TokenInfo,
  recipient: string,
  centIsInt?: boolean,
}): MetadataMessage | null => {
  const currencyAmount = convertTokenInputToCurrency({
    token,
    amountOutInt: intent.amount,
    rate: intent.conversionRate,
  })
  const convertDecimalToBigInt = (amount: number) => parseUnits(amount.toString(), token.decimals)
  const amountFilter = (m: MetadataMessage) => {
    let converted = convertDecimalToBigInt(m.amount)
    if (centIsInt) {
      converted = converted / 100n
    }
    return converted === currencyAmount || converted === (currencyAmount * -1n)
  }
  const timeFilter = (m: MetadataMessage, onlyRequireLessThan?: boolean) => {
    const date = new Date(m.date)
    let year, month, day = 0
    if (m.date.length) {
      year = +m.date.slice(0, 4)
      month = +m.date.slice(4, 6)
      day = +m.date.slice(6, 8)
    } else {
      year = date.getFullYear()
      month = date.getMonth() + 1
      day = date.getDate()
    }
    const timestamp = new Date(`${year}-${month}-${day}`)
    const tsmp = Number(intent.timestamp) * 1_000
    // intent happens first
    const intentTimestamp0 = new Date(tsmp - (tsmp % interval.day))
    const intentTimestamp1 = new Date(tsmp - (tsmp % interval.day) + interval.day)
    // if the transaction timestamp is within 1 day of the intent timestamp, it's a match
    const txTsmp = timestamp.getTime()
    if (onlyRequireLessThan) {
      return intentTimestamp0.getTime() <= txTsmp
    }
    return intentTimestamp0.getTime() === txTsmp || intentTimestamp1.getTime() === txTsmp
  }
  const filtered = metadata.filter((m) => !m.hidden && m.recipient === recipient)
  const foundWithinDay = filtered.find((m) => amountFilter(m) && timeFilter(m))
  if (foundWithinDay) {
    console.log('found within day', foundWithinDay, intent)
    return foundWithinDay
  }
  const foundWithBound = metadata.find((m) => amountFilter(m) && timeFilter(m, true))
  if (foundWithBound) {
    console.log('found with bound', foundWithBound, intent)
    return foundWithBound
  }
  const foundByAmountOnly = metadata.find(amountFilter)
  if (foundByAmountOnly) {
    console.log('found by amount only', foundByAmountOnly, intent)
    return foundByAmountOnly
  }
  console.log('no match', intent, metadata, convertDecimalToBigInt(metadata[0].amount), currencyAmount)
  return null
}
