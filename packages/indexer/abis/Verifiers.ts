import { parseAbi } from "viem";

export const Verifiers = parseAbi([
  // provider hashes from different apps
  `event ProviderHashAdded(string providerHash)`,
  `event ProviderHashRemoved(string providerHash)`,
])
