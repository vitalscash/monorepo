import { concatHex, keccak256, numberToHex, type Hex } from 'viem'

/**
 * Generate a participantId from chainId and address using the same logic as the indexer
 * @param chainId - The chain ID
 * @param address - The address
 * @returns The participant ID
 */
export function generateParticipantId(chainId: number | bigint, address: string): string {
  return keccak256(concatHex([
    numberToHex(chainId, { size: 8 }),
    address as Hex
  ]))
}
