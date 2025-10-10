// write a cli for this later
import { ChainId } from '@vitals/utils/chain'
import { providerConfigs, ProviderKey, providers, SubProviderKey, subProviderConfigs, subProviders } from '@vitals/utils/payment'
import { createPublicClient, createWalletClient, getContract, Hex, http, parseAbi, PublicClient, Transaction, TransactionReceipt, zeroHash } from 'viem'
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'
import { base, pulsechain } from 'viem/chains'

const abi = parseAbi([
  'function getProviderHashes() view returns (string[])',
  'function addProviderHash(string hash) external',
  'function removeProviderHash(string hash) external',
])

const mnemonic = process.env.MNEMONIC!
const account = mnemonic ? mnemonicToAccount(mnemonic) : privateKeyToAccount(process.env.PRIVATE_KEY! as Hex)

const loadProviderHashes = async (client: PublicClient, providerKey: ProviderKey) => {
  const providerConfig = providerConfigs(client.chain!.id as ChainId)[providerKey]
  const latestVerifier = providerConfig.verifiers[providerConfig.verifiers.length - 1]
  const anchorProviderContract = getContract({
    address: latestVerifier as Hex,
    abi,
    client,
  })
  const hashes = await anchorProviderContract.read.getProviderHashes().catch(() => [] as string[])
  return {
    hashes: hashes.slice(0),
    verifier: latestVerifier as Hex,
  }
}
const loadSubProviderHashes = async (client: PublicClient, subProviderKey: SubProviderKey) => {
  const providerConfig = subProviderConfigs.zelle![subProviderKey]
  const verifiers = providerConfig.verifiers(client.chain!.id as ChainId)
  const latestVerifier = verifiers[verifiers.length - 1]
  const providerContract = getContract({
    address: latestVerifier as Hex,
    abi,
    client,
  })
  const hashes = await providerContract.read.getProviderHashes().catch(() => [] as string[])
  return {
    hashes: hashes.slice(0),
    verifier: latestVerifier as Hex,
  }
}

const findDifferences = (anchorProviderHashes: string[], targetProviderHashes: string[]) => {
  const missingFromTarget = anchorProviderHashes.filter(hash => !targetProviderHashes.includes(hash))
  const missingFromAnchor = targetProviderHashes.filter(hash => !anchorProviderHashes.includes(hash))
  return { missingFromTarget, missingFromAnchor }
}

const main = async () => {
  console.log('starting signer=%o', account.address)
  const providerKeys = Object.values(providers)
  const anchorChain = base
  const targetChain = pulsechain
  const anchorClient = createPublicClient({
    chain: anchorChain,
    transport: http(),
  })
  const targetClient = createPublicClient({
    chain: targetChain,
    transport: http(),
  })
  for (const providerKey of providerKeys) {
    if (providerKey === providers.MANUAL || providerKey === providers.ZELLE) continue
    const [
      { hashes: anchorProviderHashes },
      { hashes: targetProviderHashes, verifier: targetVerifier },
    ] = await Promise.all([
      loadProviderHashes(anchorClient as PublicClient, providerKey),
      loadProviderHashes(targetClient, providerKey),
    ])
    const { missingFromTarget, missingFromAnchor } = findDifferences(anchorProviderHashes, targetProviderHashes)
    if (missingFromTarget.length > 0) {
      await modifyTargetHashes({
        client: targetClient,
        verifier: targetVerifier,
        hashes: missingFromTarget,
        add: true,
        provider: providerKey,
      })
    }
    if (missingFromAnchor.length > 0) {
      await modifyTargetHashes({
        client: targetClient,
        verifier: targetVerifier,
        hashes: missingFromAnchor,
        add: false,
        provider: providerKey,
      })
    }
  }
  for (const subProvider of Object.values(subProviders)) {
    const [
      { hashes: anchorSubProviderHashes },
      { hashes: targetSubProviderHashes, verifier: targetVerifier },
    ] = await Promise.all([
      loadSubProviderHashes(anchorClient as PublicClient, subProvider),
      loadSubProviderHashes(targetClient, subProvider),
    ])
    const { missingFromTarget, missingFromAnchor } = findDifferences(anchorSubProviderHashes, targetSubProviderHashes)
    // console.log('anchorSubProviderHashes=%o targetSubProviderHashes=%o', anchorSubProviderHashes, targetSubProviderHashes)
    // console.log('subProvider=%o missingFromTarget=%o missingFromAnchor=%o', subProvider, missingFromTarget, missingFromAnchor)
    if (missingFromTarget.length > 0) {
      await modifyTargetHashes({
        client: targetClient,
        verifier: targetVerifier,
        hashes: missingFromTarget,
        add: true,
        provider: subProvider,
      })
    }
    if (missingFromAnchor.length > 0) {
      await modifyTargetHashes({
        client: targetClient,
        verifier: targetVerifier,
        hashes: missingFromAnchor,
        add: false,
        provider: subProvider,
      })
    }
  }
}

const modifyTargetHashes = async ({
  client,
  verifier,
  provider,
  hashes,
  add,
}: {
  client: PublicClient
  verifier: Hex
  provider: ProviderKey | SubProviderKey
  hashes: string[]
  add: boolean
}) => {
  const wallet = createWalletClient({
    chain: client.chain!,
    transport: http(),
    account,
  })
  const providerContract = getContract({
    address: verifier,
    abi,
    client: {
      client,
      wallet,
    },
  })
  const len = hashes.length
  let nonce = await client.getTransactionCount({ address: account.address })
  for (let i = 0; i < len; i++) {
    const block = await client.getBlock({ blockTag: 'latest' })
    const gasInputs = {
      maxFeePerGas: block.baseFeePerGas! * 2n,
      maxPriorityFeePerGas: block.baseFeePerGas! / 5n,
    }
    const hash = hashes[i]
    let tx!: Hex
    tx = zeroHash
    if (add) {
      tx = await providerContract.write.addProviderHash([hash], {
        nonce,
        ...gasInputs,
      })
    } else {
      tx = await providerContract.write.removeProviderHash([hash], {
        nonce,
        ...gasInputs,
      })
    }
    console.log(`waiting for tx provider=%o nonce=%o tx=%o action=%s provider_hash=%o`,
      provider, nonce, tx, add ? 'add' : 'remove', hash)
    if (tx !== zeroHash) {
      let receipt: TransactionReceipt | null = null
      while (!receipt) {
        receipt = await client.waitForTransactionReceipt({ hash: tx }).catch(async () => {
          console.log('tx not found, retrying...')
          await new Promise(resolve => setTimeout(resolve, 2_000))
          return null
        })
      }
    }
    nonce++
    await new Promise(resolve => setTimeout(resolve, 10_000))
  }
}

main()
