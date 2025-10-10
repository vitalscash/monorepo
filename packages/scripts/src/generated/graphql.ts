import type { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Meta = {
  __typename?: 'Meta';
  status?: Maybe<Scalars['JSON']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<Meta>;
  accumulatedStat?: Maybe<AccumulatedStat>;
  accumulatedStats: AccumulatedStatPage;
  action?: Maybe<Action>;
  actions: ActionPage;
  block?: Maybe<Block>;
  blocks: BlockPage;
  deposit?: Maybe<Deposit>;
  depositClosed?: Maybe<DepositClosed>;
  depositCloseds: DepositClosedPage;
  depositConversionRateUpdated?: Maybe<DepositConversionRateUpdated>;
  depositConversionRateUpdateds: DepositConversionRateUpdatedPage;
  depositCurrencyAdded?: Maybe<DepositCurrencyAdded>;
  depositCurrencyAddeds: DepositCurrencyAddedPage;
  depositDelta?: Maybe<DepositDelta>;
  depositDeltas: DepositDeltaPage;
  depositReceived?: Maybe<DepositReceived>;
  depositReceiveds: DepositReceivedPage;
  depositVerifierAdded?: Maybe<DepositVerifierAdded>;
  depositVerifierAddeds: DepositVerifierAddedPage;
  depositWithdrawn?: Maybe<DepositWithdrawn>;
  depositWithdrawns: DepositWithdrawnPage;
  deposits: DepositPage;
  intentFulfilled?: Maybe<IntentFulfilled>;
  intentFulfilleds: IntentFulfilledPage;
  intentPruned?: Maybe<IntentPruned>;
  intentPruneds: IntentPrunedPage;
  intentSignaled?: Maybe<IntentSignaled>;
  intentSignaleds: IntentSignaledPage;
  participant?: Maybe<Participant>;
  participants: ParticipantPage;
  payeeDetails?: Maybe<PayeeDetails>;
  payeeDetailss: PayeeDetailsPage;
  paymentVerifier?: Maybe<PaymentVerifier>;
  paymentVerifierAdded?: Maybe<PaymentVerifierAdded>;
  paymentVerifierAddeds: PaymentVerifierAddedPage;
  paymentVerifierFeeShareUpdated?: Maybe<PaymentVerifierFeeShareUpdated>;
  paymentVerifierFeeShareUpdateds: PaymentVerifierFeeShareUpdatedPage;
  paymentVerifierRemoved?: Maybe<PaymentVerifierRemoved>;
  paymentVerifierRemoveds: PaymentVerifierRemovedPage;
  paymentVerifiers: PaymentVerifierPage;
  providerHash?: Maybe<ProviderHash>;
  providerHashAdded?: Maybe<ProviderHashAdded>;
  providerHashAddeds: ProviderHashAddedPage;
  providerHashRemoved?: Maybe<ProviderHashRemoved>;
  providerHashRemoveds: ProviderHashRemovedPage;
  providerHashs: ProviderHashPage;
  stat?: Maybe<Stat>;
  stats: StatPage;
  transaction?: Maybe<Transaction>;
  transactions: TransactionPage;
  verifier?: Maybe<Verifier>;
  verifiers: VerifierPage;
};


export type QueryAccumulatedStatArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryAccumulatedStatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AccumulatedStatFilter>;
};


export type QueryActionArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryActionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ActionFilter>;
};


export type QueryBlockArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<BlockFilter>;
};


export type QueryDepositArgs = {
  depositId: Scalars['String']['input'];
};


export type QueryDepositClosedArgs = {
  depositId: Scalars['String']['input'];
};


export type QueryDepositClosedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositClosedFilter>;
};


export type QueryDepositConversionRateUpdatedArgs = {
  depositConversionRateUpdatedId: Scalars['String']['input'];
};


export type QueryDepositConversionRateUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};


export type QueryDepositCurrencyAddedArgs = {
  depositCurrencyAddedId: Scalars['String']['input'];
};


export type QueryDepositCurrencyAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositCurrencyAddedFilter>;
};


export type QueryDepositDeltaArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryDepositDeltasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositDeltaFilter>;
};


export type QueryDepositReceivedArgs = {
  depositId: Scalars['String']['input'];
};


export type QueryDepositReceivedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositReceivedFilter>;
};


export type QueryDepositVerifierAddedArgs = {
  depositVerifierAddedId: Scalars['String']['input'];
};


export type QueryDepositVerifierAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositVerifierAddedFilter>;
};


export type QueryDepositWithdrawnArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryDepositWithdrawnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositWithdrawnFilter>;
};


export type QueryDepositsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositFilter>;
};


export type QueryIntentFulfilledArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryIntentFulfilledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentFulfilledFilter>;
};


export type QueryIntentPrunedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryIntentPrunedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentPrunedFilter>;
};


export type QueryIntentSignaledArgs = {
  intentHash: Scalars['String']['input'];
};


export type QueryIntentSignaledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentSignaledFilter>;
};


export type QueryParticipantArgs = {
  participantId: Scalars['String']['input'];
};


export type QueryParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ParticipantFilter>;
};


export type QueryPayeeDetailsArgs = {
  payeeDetailsId: Scalars['String']['input'];
};


export type QueryPayeeDetailssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PayeeDetailsFilter>;
};


export type QueryPaymentVerifierArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentVerifierAddedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryPaymentVerifierAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PaymentVerifierAddedFilter>;
};


export type QueryPaymentVerifierFeeShareUpdatedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryPaymentVerifierFeeShareUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PaymentVerifierFeeShareUpdatedFilter>;
};


export type QueryPaymentVerifierRemovedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryPaymentVerifierRemovedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PaymentVerifierRemovedFilter>;
};


export type QueryPaymentVerifiersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PaymentVerifierFilter>;
};


export type QueryProviderHashArgs = {
  providerHashId: Scalars['String']['input'];
};


export type QueryProviderHashAddedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryProviderHashAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashAddedFilter>;
};


export type QueryProviderHashRemovedArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryProviderHashRemovedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashRemovedFilter>;
};


export type QueryProviderHashsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashFilter>;
};


export type QueryStatArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryStatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<StatFilter>;
};


export type QueryTransactionArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TransactionFilter>;
};


export type QueryVerifierArgs = {
  verifierId: Scalars['String']['input'];
};


export type QueryVerifiersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<VerifierFilter>;
};

export type AccumulatedStat = {
  __typename?: 'accumulatedStat';
  action: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  chainId: Scalars['BigInt']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  orderId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  token: Scalars['String']['output'];
  type: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};

export type AccumulatedStatFilter = {
  AND?: InputMaybe<Array<InputMaybe<AccumulatedStatFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AccumulatedStatFilter>>>;
  action?: InputMaybe<Scalars['String']['input']>;
  action_contains?: InputMaybe<Scalars['String']['input']>;
  action_ends_with?: InputMaybe<Scalars['String']['input']>;
  action_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  action_not?: InputMaybe<Scalars['String']['input']>;
  action_not_contains?: InputMaybe<Scalars['String']['input']>;
  action_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  action_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  action_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  action_starts_with?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type AccumulatedStatPage = {
  __typename?: 'accumulatedStatPage';
  items: Array<AccumulatedStat>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Action = {
  __typename?: 'action';
  deposit?: Maybe<Deposit>;
  depositCloseds?: Maybe<DepositClosedPage>;
  depositConversionRateUpdateds?: Maybe<DepositConversionRateUpdatedPage>;
  depositCurrencyAddeds?: Maybe<DepositCurrencyAddedPage>;
  depositId: Scalars['String']['output'];
  depositReceiveds?: Maybe<DepositReceivedPage>;
  depositWithdrawns?: Maybe<DepositWithdrawnPage>;
  intentFulfilleds?: Maybe<IntentFulfilledPage>;
  intentPruneds?: Maybe<IntentPrunedPage>;
  intentSignaleds?: Maybe<IntentSignaledPage>;
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};


export type ActionDepositClosedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositClosedFilter>;
};


export type ActionDepositConversionRateUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};


export type ActionDepositCurrencyAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositCurrencyAddedFilter>;
};


export type ActionDepositReceivedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositReceivedFilter>;
};


export type ActionDepositWithdrawnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositWithdrawnFilter>;
};


export type ActionIntentFulfilledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentFulfilledFilter>;
};


export type ActionIntentPrunedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentPrunedFilter>;
};


export type ActionIntentSignaledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentSignaledFilter>;
};

export type ActionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ActionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ActionFilter>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ActionPage = {
  __typename?: 'actionPage';
  items: Array<Action>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'block';
  chainId: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  number: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type BlockFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlockFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlockFilter>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['BigInt']['input']>;
  number_gt?: InputMaybe<Scalars['BigInt']['input']>;
  number_gte?: InputMaybe<Scalars['BigInt']['input']>;
  number_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  number_lt?: InputMaybe<Scalars['BigInt']['input']>;
  number_lte?: InputMaybe<Scalars['BigInt']['input']>;
  number_not?: InputMaybe<Scalars['BigInt']['input']>;
  number_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type BlockPage = {
  __typename?: 'blockPage';
  items: Array<Block>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Deposit = {
  __typename?: 'deposit';
  actions?: Maybe<ActionPage>;
  chainId: Scalars['BigInt']['output'];
  depositCloseds?: Maybe<DepositClosedPage>;
  depositConversionRateCurrencies: Array<Scalars['String']['output']>;
  depositConversionRateUpdateds?: Maybe<DepositConversionRateUpdatedPage>;
  depositConversionRateVerifiers: Array<Scalars['String']['output']>;
  depositCurrencyAddeds?: Maybe<DepositCurrencyAddedPage>;
  depositDeltas?: Maybe<DepositDeltaPage>;
  depositId: Scalars['String']['output'];
  depositReceiveds?: Maybe<DepositReceivedPage>;
  depositVerifierAddeds?: Maybe<DepositVerifierAddedPage>;
  depositVerifiers?: Maybe<DepositVerifierAddedPage>;
  depositWithdrawns?: Maybe<DepositWithdrawnPage>;
  deposited: Scalars['BigInt']['output'];
  intentFulfilleds?: Maybe<IntentFulfilledPage>;
  intentPruneds?: Maybe<IntentPrunedPage>;
  intentSignaleds?: Maybe<IntentSignaledPage>;
  logId: Scalars['String']['output'];
  maxAmount: Scalars['BigInt']['output'];
  minAmount: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  owner?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  remaining: Scalars['BigInt']['output'];
  status: Status;
  token: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};


export type DepositActionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ActionFilter>;
};


export type DepositDepositClosedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositClosedFilter>;
};


export type DepositDepositConversionRateUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};


export type DepositDepositCurrencyAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositCurrencyAddedFilter>;
};


export type DepositDepositDeltasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositDeltaFilter>;
};


export type DepositDepositReceivedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositReceivedFilter>;
};


export type DepositDepositVerifierAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositVerifierAddedFilter>;
};


export type DepositDepositVerifiersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositVerifierAddedFilter>;
};


export type DepositDepositWithdrawnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositWithdrawnFilter>;
};


export type DepositIntentFulfilledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentFulfilledFilter>;
};


export type DepositIntentPrunedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentPrunedFilter>;
};


export type DepositIntentSignaledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentSignaledFilter>;
};

export type DepositClosed = {
  __typename?: 'depositClosed';
  action?: Maybe<Action>;
  deposit?: Maybe<Deposit>;
  depositId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};

export type DepositClosedFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositClosedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositClosedFilter>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositClosedPage = {
  __typename?: 'depositClosedPage';
  items: Array<DepositClosed>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositConversionRateUpdated = {
  __typename?: 'depositConversionRateUpdated';
  action?: Maybe<Action>;
  active: Scalars['Boolean']['output'];
  changeId: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  deposit?: Maybe<Deposit>;
  depositConversionRateUpdatedId: Scalars['String']['output'];
  depositCurrencyAdded?: Maybe<DepositCurrencyAdded>;
  depositCurrencyAddedId: Scalars['String']['output'];
  depositId: Scalars['String']['output'];
  depositVerifierAdded?: Maybe<DepositVerifierAdded>;
  depositVerifierAddedId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  value: Scalars['BigInt']['output'];
  verifier: Scalars['String']['output'];
};

export type DepositConversionRateUpdatedFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositConversionRateUpdatedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositConversionRateUpdatedFilter>>>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  changeId?: InputMaybe<Scalars['Int']['input']>;
  changeId_gt?: InputMaybe<Scalars['Int']['input']>;
  changeId_gte?: InputMaybe<Scalars['Int']['input']>;
  changeId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  changeId_lt?: InputMaybe<Scalars['Int']['input']>;
  changeId_lte?: InputMaybe<Scalars['Int']['input']>;
  changeId_not?: InputMaybe<Scalars['Int']['input']>;
  changeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositConversionRateUpdatedPage = {
  __typename?: 'depositConversionRateUpdatedPage';
  items: Array<DepositConversionRateUpdated>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositCurrencyAdded = {
  __typename?: 'depositCurrencyAdded';
  action?: Maybe<Action>;
  currency: Scalars['String']['output'];
  currentDepositConversionRateUpdated?: Maybe<DepositConversionRateUpdated>;
  currentDepositConversionRateUpdatedId: Scalars['String']['output'];
  deposit?: Maybe<Deposit>;
  depositConversionRateUpdateds?: Maybe<DepositConversionRateUpdatedPage>;
  depositCurrencyAddedId: Scalars['String']['output'];
  depositId: Scalars['String']['output'];
  depositVerifierAdded?: Maybe<DepositVerifierAdded>;
  depositVerifierAddedId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};


export type DepositCurrencyAddedDepositConversionRateUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};

export type DepositCurrencyAddedFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositCurrencyAddedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositCurrencyAddedFilter>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_contains?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currentDepositConversionRateUpdatedId_not?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currentDepositConversionRateUpdatedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentDepositConversionRateUpdatedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositCurrencyAddedPage = {
  __typename?: 'depositCurrencyAddedPage';
  items: Array<DepositCurrencyAdded>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositDelta = {
  __typename?: 'depositDelta';
  action?: Maybe<Action>;
  amountAfter: Scalars['BigInt']['output'];
  amountBefore: Scalars['BigInt']['output'];
  delta: Scalars['BigInt']['output'];
  deposit?: Maybe<Deposit>;
  depositId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
};

export type DepositDeltaFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositDeltaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositDeltaFilter>>>;
  amountAfter?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountAfter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountAfter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountBefore?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountBefore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountBefore_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  delta?: InputMaybe<Scalars['BigInt']['input']>;
  delta_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delta_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delta_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  delta_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delta_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delta_not?: InputMaybe<Scalars['BigInt']['input']>;
  delta_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositDeltaPage = {
  __typename?: 'depositDeltaPage';
  items: Array<DepositDelta>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositFilter>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  depositConversionRateCurrencies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateCurrencies_has?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateCurrencies_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateCurrencies_not_has?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateVerifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateVerifiers_has?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateVerifiers_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateVerifiers_not_has?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposited?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deposited_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_not?: InputMaybe<Scalars['BigInt']['input']>;
  deposited_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  maxAmount?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  maxAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  maxAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  minAmount?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  minAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  remaining?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_gt?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_gte?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  remaining_lt?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_lte?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_not?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  status?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<InputMaybe<Status>>>;
  status_not?: InputMaybe<Status>;
  status_not_in?: InputMaybe<Array<InputMaybe<Status>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositPage = {
  __typename?: 'depositPage';
  items: Array<Deposit>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositReceived = {
  __typename?: 'depositReceived';
  action?: Maybe<Action>;
  amount: Scalars['BigInt']['output'];
  deposit?: Maybe<Deposit>;
  depositDelta?: Maybe<DepositDelta>;
  depositId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};

export type DepositReceivedFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositReceivedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositReceivedFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositReceivedPage = {
  __typename?: 'depositReceivedPage';
  items: Array<DepositReceived>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositVerifierAdded = {
  __typename?: 'depositVerifierAdded';
  deposit?: Maybe<Deposit>;
  depositConversionRateUpdated?: Maybe<DepositConversionRateUpdatedPage>;
  depositCurrencyAdded?: Maybe<DepositCurrencyAddedPage>;
  depositId: Scalars['String']['output'];
  depositVerifierAddedId: Scalars['String']['output'];
  intentGatingService: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  payeeDetails?: Maybe<PayeeDetails>;
  payeeDetailsHash: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};


export type DepositVerifierAddedDepositConversionRateUpdatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};


export type DepositVerifierAddedDepositCurrencyAddedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositCurrencyAddedFilter>;
};

export type DepositVerifierAddedFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositVerifierAddedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositVerifierAddedFilter>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_contains?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentGatingService_not?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_contains?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentGatingService_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetailsHash_not?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetailsHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositVerifierAddedPage = {
  __typename?: 'depositVerifierAddedPage';
  items: Array<DepositVerifierAdded>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositWithdrawn = {
  __typename?: 'depositWithdrawn';
  action?: Maybe<Action>;
  amount: Scalars['BigInt']['output'];
  deposit?: Maybe<Deposit>;
  depositDelta?: Maybe<DepositDelta>;
  depositId: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};

export type DepositWithdrawnFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepositWithdrawnFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepositWithdrawnFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type DepositWithdrawnPage = {
  __typename?: 'depositWithdrawnPage';
  items: Array<DepositWithdrawn>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IntentFulfilled = {
  __typename?: 'intentFulfilled';
  action?: Maybe<Action>;
  amount: Scalars['BigInt']['output'];
  currency: Scalars['String']['output'];
  deposit?: Maybe<Deposit>;
  depositConversionRateUpdated?: Maybe<DepositConversionRateUpdated>;
  depositConversionRateUpdatedId: Scalars['String']['output'];
  depositCurrencyAdded?: Maybe<DepositCurrencyAdded>;
  depositCurrencyAddedId: Scalars['String']['output'];
  depositDelta?: Maybe<DepositDelta>;
  depositId: Scalars['String']['output'];
  depositVerifierAdded?: Maybe<DepositVerifierAdded>;
  depositVerifierAddedId: Scalars['String']['output'];
  intentHash: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  owner?: Maybe<Participant>;
  ownerId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  sustainabilityFee: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
  verifierFee: Scalars['BigInt']['output'];
};

export type IntentFulfilledFilter = {
  AND?: InputMaybe<Array<InputMaybe<IntentFulfilledFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IntentFulfilledFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash?: InputMaybe<Scalars['String']['input']>;
  intentHash_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  ownerId_contains?: InputMaybe<Scalars['String']['input']>;
  ownerId_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerId_not?: InputMaybe<Scalars['String']['input']>;
  ownerId_not_contains?: InputMaybe<Scalars['String']['input']>;
  ownerId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ownerId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  sustainabilityFee?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sustainabilityFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  sustainabilityFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifierFee?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  verifierFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  verifierFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type IntentFulfilledPage = {
  __typename?: 'intentFulfilledPage';
  items: Array<IntentFulfilled>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IntentPruned = {
  __typename?: 'intentPruned';
  action?: Maybe<Action>;
  deposit?: Maybe<Deposit>;
  depositId: Scalars['String']['output'];
  intentHash: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
};

export type IntentPrunedFilter = {
  AND?: InputMaybe<Array<InputMaybe<IntentPrunedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IntentPrunedFilter>>>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash?: InputMaybe<Scalars['String']['input']>;
  intentHash_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type IntentPrunedPage = {
  __typename?: 'intentPrunedPage';
  items: Array<IntentPruned>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IntentSignaled = {
  __typename?: 'intentSignaled';
  action?: Maybe<Action>;
  amount: Scalars['BigInt']['output'];
  currency: Scalars['String']['output'];
  deposit?: Maybe<Deposit>;
  depositConversionRateUpdated?: Maybe<DepositConversionRateUpdated>;
  depositConversionRateUpdatedId: Scalars['String']['output'];
  depositCurrencyAdded?: Maybe<DepositCurrencyAdded>;
  depositCurrencyAddedId: Scalars['String']['output'];
  depositId: Scalars['String']['output'];
  depositVerifierAdded?: Maybe<DepositVerifierAdded>;
  depositVerifierAddedId: Scalars['String']['output'];
  intentHash: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  participant?: Maybe<Participant>;
  participantId: Scalars['String']['output'];
  to: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};

export type IntentSignaledFilter = {
  AND?: InputMaybe<Array<InputMaybe<IntentSignaledFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IntentSignaledFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositConversionRateUpdatedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositConversionRateUpdatedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositCurrencyAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositCurrencyAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['String']['input']>;
  depositId_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not?: InputMaybe<Scalars['String']['input']>;
  depositId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositId_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositVerifierAddedId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  depositVerifierAddedId_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash?: InputMaybe<Scalars['String']['input']>;
  intentHash_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['String']['input']>;
  logId_contains?: InputMaybe<Scalars['String']['input']>;
  logId_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not?: InputMaybe<Scalars['String']['input']>;
  logId_not_contains?: InputMaybe<Scalars['String']['input']>;
  logId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logId_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type IntentSignaledPage = {
  __typename?: 'intentSignaledPage';
  items: Array<IntentSignaled>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Participant = {
  __typename?: 'participant';
  address: Scalars['String']['output'];
  chainId: Scalars['BigInt']['output'];
  depositReceived?: Maybe<DepositReceivedPage>;
  depositWithdrawn?: Maybe<DepositWithdrawnPage>;
  deposits?: Maybe<DepositPage>;
  participantId: Scalars['String']['output'];
};


export type ParticipantDepositReceivedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositReceivedFilter>;
};


export type ParticipantDepositWithdrawnArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositWithdrawnFilter>;
};


export type ParticipantDepositsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositFilter>;
};

export type ParticipantFilter = {
  AND?: InputMaybe<Array<InputMaybe<ParticipantFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ParticipantFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  participantId?: InputMaybe<Scalars['String']['input']>;
  participantId_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not?: InputMaybe<Scalars['String']['input']>;
  participantId_not_contains?: InputMaybe<Scalars['String']['input']>;
  participantId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participantId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  participantId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participantId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ParticipantPage = {
  __typename?: 'participantPage';
  items: Array<Participant>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PayeeDetails = {
  __typename?: 'payeeDetails';
  data: Scalars['String']['output'];
  intentGatingService: Scalars['String']['output'];
  payeeDetails: Scalars['String']['output'];
  payeeDetailsId: Scalars['String']['output'];
};

export type PayeeDetailsFilter = {
  AND?: InputMaybe<Array<InputMaybe<PayeeDetailsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PayeeDetailsFilter>>>;
  data?: InputMaybe<Scalars['String']['input']>;
  data_contains?: InputMaybe<Scalars['String']['input']>;
  data_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  data_not?: InputMaybe<Scalars['String']['input']>;
  data_not_contains?: InputMaybe<Scalars['String']['input']>;
  data_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  data_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  data_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_contains?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentGatingService_not?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_contains?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  intentGatingService_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  intentGatingService_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetails?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetailsId_not?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_not_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetailsId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetailsId_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetails_not?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_not_contains?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  payeeDetails_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  payeeDetails_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PayeeDetailsPage = {
  __typename?: 'payeeDetailsPage';
  items: Array<PayeeDetails>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentVerifier = {
  __typename?: 'paymentVerifier';
  active: Scalars['Boolean']['output'];
  feeShare: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};

export type PaymentVerifierAdded = {
  __typename?: 'paymentVerifierAdded';
  feeShare: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  paymentVerifier?: Maybe<PaymentVerifier>;
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
  verifierId: Scalars['String']['output'];
};

export type PaymentVerifierAddedFilter = {
  AND?: InputMaybe<Array<InputMaybe<PaymentVerifierAddedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PaymentVerifierAddedFilter>>>;
  feeShare?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentVerifierAddedPage = {
  __typename?: 'paymentVerifierAddedPage';
  items: Array<PaymentVerifierAdded>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentVerifierFeeShareUpdated = {
  __typename?: 'paymentVerifierFeeShareUpdated';
  feeShare: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier?: Maybe<PaymentVerifier>;
  verifierId: Scalars['String']['output'];
};

export type PaymentVerifierFeeShareUpdatedFilter = {
  AND?: InputMaybe<Array<InputMaybe<PaymentVerifierFeeShareUpdatedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PaymentVerifierFeeShareUpdatedFilter>>>;
  feeShare?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentVerifierFeeShareUpdatedPage = {
  __typename?: 'paymentVerifierFeeShareUpdatedPage';
  items: Array<PaymentVerifierFeeShareUpdated>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentVerifierFilter = {
  AND?: InputMaybe<Array<InputMaybe<PaymentVerifierFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PaymentVerifierFilter>>>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  feeShare?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeShare_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentVerifierPage = {
  __typename?: 'paymentVerifierPage';
  items: Array<PaymentVerifier>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentVerifierRemoved = {
  __typename?: 'paymentVerifierRemoved';
  orderId: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
  transactionId: Scalars['String']['output'];
  verifier?: Maybe<PaymentVerifier>;
  verifierId: Scalars['String']['output'];
};

export type PaymentVerifierRemovedFilter = {
  AND?: InputMaybe<Array<InputMaybe<PaymentVerifierRemovedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PaymentVerifierRemovedFilter>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentVerifierRemovedPage = {
  __typename?: 'paymentVerifierRemovedPage';
  items: Array<PaymentVerifierRemoved>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProviderHash = {
  __typename?: 'providerHash';
  active: Scalars['Boolean']['output'];
  providerHash: Scalars['String']['output'];
  providerHashAdded?: Maybe<ProviderHashAddedPage>;
  providerHashId: Scalars['String']['output'];
  providerHashRemoved?: Maybe<ProviderHashRemovedPage>;
};


export type ProviderHashProviderHashAddedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashAddedFilter>;
};


export type ProviderHashProviderHashRemovedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashRemovedFilter>;
};

export type ProviderHashAdded = {
  __typename?: 'providerHashAdded';
  orderId: Scalars['String']['output'];
  providerHash?: Maybe<ProviderHash>;
  providerHashId: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
  verifier?: Maybe<Verifier>;
  verifierId: Scalars['String']['output'];
};

export type ProviderHashAddedFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProviderHashAddedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProviderHashAddedFilter>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId?: InputMaybe<Scalars['String']['input']>;
  providerHashId_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ProviderHashAddedPage = {
  __typename?: 'providerHashAddedPage';
  items: Array<ProviderHashAdded>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProviderHashFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProviderHashFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProviderHashFilter>>>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  providerHash?: InputMaybe<Scalars['String']['input']>;
  providerHashId?: InputMaybe<Scalars['String']['input']>;
  providerHashId_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHash_contains?: InputMaybe<Scalars['String']['input']>;
  providerHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHash_not?: InputMaybe<Scalars['String']['input']>;
  providerHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  providerHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHash_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ProviderHashPage = {
  __typename?: 'providerHashPage';
  items: Array<ProviderHash>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProviderHashRemoved = {
  __typename?: 'providerHashRemoved';
  orderId: Scalars['String']['output'];
  providerHash?: Maybe<ProviderHash>;
  providerHashId: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
  verifier?: Maybe<Verifier>;
  verifierId: Scalars['String']['output'];
};

export type ProviderHashRemovedFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProviderHashRemovedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProviderHashRemovedFilter>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId?: InputMaybe<Scalars['String']['input']>;
  providerHashId_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_contains?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  providerHashId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  providerHashId_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionId_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ProviderHashRemovedPage = {
  __typename?: 'providerHashRemovedPage';
  items: Array<ProviderHashRemoved>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Stat = {
  __typename?: 'stat';
  action: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  chainId: Scalars['BigInt']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  orderId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  token: Scalars['String']['output'];
  type: Scalars['String']['output'];
  verifier: Scalars['String']['output'];
};

export type StatFilter = {
  AND?: InputMaybe<Array<InputMaybe<StatFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<StatFilter>>>;
  action?: InputMaybe<Scalars['String']['input']>;
  action_contains?: InputMaybe<Scalars['String']['input']>;
  action_ends_with?: InputMaybe<Scalars['String']['input']>;
  action_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  action_not?: InputMaybe<Scalars['String']['input']>;
  action_not_contains?: InputMaybe<Scalars['String']['input']>;
  action_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  action_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  action_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  action_starts_with?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifier_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not?: InputMaybe<Scalars['String']['input']>;
  verifier_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifier_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifier_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type StatPage = {
  __typename?: 'statPage';
  items: Array<Stat>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum Status {
  Active = 'active',
  Closed = 'closed',
  Underfunded = 'underfunded',
  Withdrawn = 'withdrawn'
}

export type Transaction = {
  __typename?: 'transaction';
  actions?: Maybe<ActionPage>;
  block?: Maybe<Block>;
  blockId: Scalars['String']['output'];
  depositCloseds?: Maybe<DepositClosedPage>;
  depositConversionRateUpdateds?: Maybe<DepositConversionRateUpdatedPage>;
  depositCurrencyAddeds?: Maybe<DepositCurrencyAddedPage>;
  depositReceiveds?: Maybe<DepositReceivedPage>;
  depositWithdrawns?: Maybe<DepositWithdrawnPage>;
  deposits?: Maybe<DepositPage>;
  from: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  index: Scalars['BigInt']['output'];
  intentFulfilleds?: Maybe<IntentFulfilledPage>;
  intentPruneds?: Maybe<IntentPrunedPage>;
  intentSignaleds?: Maybe<IntentSignaledPage>;
  orderId: Scalars['String']['output'];
  to: Scalars['String']['output'];
};


export type TransactionActionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ActionFilter>;
};


export type TransactionDepositClosedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositClosedFilter>;
};


export type TransactionDepositConversionRateUpdatedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositConversionRateUpdatedFilter>;
};


export type TransactionDepositCurrencyAddedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositCurrencyAddedFilter>;
};


export type TransactionDepositReceivedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositReceivedFilter>;
};


export type TransactionDepositWithdrawnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositWithdrawnFilter>;
};


export type TransactionDepositsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DepositFilter>;
};


export type TransactionIntentFulfilledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentFulfilledFilter>;
};


export type TransactionIntentPrunedsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentPrunedFilter>;
};


export type TransactionIntentSignaledsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<IntentSignaledFilter>;
};

export type TransactionFilter = {
  AND?: InputMaybe<Array<InputMaybe<TransactionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TransactionFilter>>>;
  blockId?: InputMaybe<Scalars['String']['input']>;
  blockId_contains?: InputMaybe<Scalars['String']['input']>;
  blockId_ends_with?: InputMaybe<Scalars['String']['input']>;
  blockId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blockId_not?: InputMaybe<Scalars['String']['input']>;
  blockId_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  blockId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blockId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  blockId_starts_with?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['BigInt']['input']>;
  index_gt?: InputMaybe<Scalars['BigInt']['input']>;
  index_gte?: InputMaybe<Scalars['BigInt']['input']>;
  index_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  index_lt?: InputMaybe<Scalars['BigInt']['input']>;
  index_lte?: InputMaybe<Scalars['BigInt']['input']>;
  index_not?: InputMaybe<Scalars['BigInt']['input']>;
  index_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionPage = {
  __typename?: 'transactionPage';
  items: Array<Transaction>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Verifier = {
  __typename?: 'verifier';
  address: Scalars['String']['output'];
  chainId: Scalars['BigInt']['output'];
  providerHashAdded?: Maybe<ProviderHashAddedPage>;
  providerHashRemoved?: Maybe<ProviderHashRemovedPage>;
  verifierId: Scalars['String']['output'];
};


export type VerifierProviderHashAddedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashAddedFilter>;
};


export type VerifierProviderHashRemovedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ProviderHashRemovedFilter>;
};

export type VerifierFilter = {
  AND?: InputMaybe<Array<InputMaybe<VerifierFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VerifierFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
  verifierId_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_contains?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifierId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  verifierId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type VerifierPage = {
  __typename?: 'verifierPage';
  items: Array<Verifier>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;