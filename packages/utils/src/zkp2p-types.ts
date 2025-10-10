import type { Hex } from "viem"

import type { ProviderKey, ValidationDepositData } from "./payment.js"

export type ValidationOptions = {
  providerKey: ProviderKey
  telegramHandle: string
  providerId: string
}

export type Zkp2pResponse<T> = {
  success: boolean
  message: string
  statusCode: number
  responseObject: T
}

export type CreateResponse = {
  id: number
  processorName: string
  depositData: string
  hashedOnchainId: Hex
  createdAt: string
}

export type PayeeDetails = {
  id: number
  processorName: string
  createdAt: string
  hashedOnchainId: Hex
  depositData: ValidationDepositData
}

export type IntentValidationOptions = {
  processorName: ProviderKey
  depositId: string
  tokenAmount: string
  payeeDetails: Hex
  toAddress: Hex
  fiatCurrencyCode: Hex
  chainId: string
}

export type IntentValidation = {
  signedIntent: Hex
  intentData: {
    depositId: string
    tokenAmount: string
    recipientAddress: Hex
    verifierAddress: Hex
    currencyCodeHash: Hex
    gatingServiceSignature: Hex
  },
  depositData: ValidationDepositData
}
