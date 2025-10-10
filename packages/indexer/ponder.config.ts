import { createConfig } from "ponder";

import { getContracts, type Contracts } from "@vitals/utils";

import { Escrow } from "./abis/Escrow";
import { base, pulsechain } from "viem/chains";
import { Verifiers } from "./abis/Verifiers";

const baseContracts = getContracts(base.id)!
const pulsechainContracts = getContracts(pulsechain.id)!

console.log('dburl=%o', process.env.DATABASE_URL)

const addressesByChain = (contracts: Contracts) => {
  return [
    ...contracts!.venmoReclaimVerifier,
    ...contracts!.wiseReclaimVerifier,
    ...contracts!.revolutReclaimVerifier,
    ...contracts!.zelleBaseVerifier,
    ...contracts!.zelleBoAReclaimVerifier,
    ...contracts!.zelleChaseReclaimVerifier,
    ...contracts!.zelleCitiReclaimVerifier,
    ...contracts!.cashappReclaimVerifier,
    ...contracts!.paypalReclaimVerifier,
    ...contracts!.monzoReclaimVerifier,
    ...contracts!.mercadopagoReclaimVerifier,
  ]
}

const startBlocks = {
  base: {
    default: 25303495,
  },
  pulsechain: {
    default: 24114308,
  },
}

export default createConfig({
  chains: {
    base: {
      id: 8453,
      rpc: process.env.PONDER_RPC_URL_8453,
      maxRequestsPerSecond: 50,
    },
    pulsechain: {
      id: 369,
      rpc: process.env.PONDER_RPC_URL_369,
      maxRequestsPerSecond: 500,
    },
  },
  contracts: {
    Verifiers: {
      chain: {
        base: {
          address: addressesByChain(baseContracts),
          startBlock: startBlocks.base.default,
        },
        pulsechain: {
          address: addressesByChain(pulsechainContracts),
          startBlock: startBlocks.pulsechain.default,
        },
      },
      abi: Verifiers,
      filter: [{
        event: "ProviderHashAdded",
        args: {},
      }, {
        event: "ProviderHashRemoved",
        args: {},
      }],
    },
    Escrow: {
      chain: {
        base: {
          address: baseContracts!.escrow,
          startBlock: startBlocks.base.default,
        },
        pulsechain: {
          address: pulsechainContracts!.escrow,
          startBlock: startBlocks.pulsechain.default,
        },
      },
      abi: Escrow,
      filter: [{
        event: "DepositReceived",
        args: {},
      }, {
        event: 'DepositWithdrawn',
        args: {},
      }, {
        event: 'DepositClosed',
        args: {},
      }, {
        event: 'DepositConversionRateUpdated',
        args: {},
      }, {
        event: 'DepositCurrencyAdded',
        args: {},
      }, {
        event: 'IntentSignaled',
        args: {},
      }, {
        event: 'PaymentVerifierAdded',
        args: {},
      }, {
        event: 'PaymentVerifierFeeShareUpdated',
        args: {},
      }, {
        event: 'PaymentVerifierRemoved',
        args: {},
      }],
    },
  },
});
