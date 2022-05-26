import { ChainId } from '@beland/schemas'
import { action } from 'typesafe-actions'
import { buildTransactionPayload } from '@beland/dapps/dist/modules/transaction/utils'
import BigNumber from 'bignumber.js'

/// FETCH LAND AUCTION PRICE
/// --------------------------------

export const FETCH_TOKEN_SALE_INFO_REQUEST = '[Request] Fetch Token Sale Info'
export const FETCH_TOKEN_SALE_INFO_SUCCESS = '[Success] Fetch Token Sale Info'
export const FETCH_TOKEN_SALE_INFO_FAILURE = '[Failure] Fetch Token Sale Info'

export const fetchTokenSaleInfoRequest = (user: string | undefined) => action(FETCH_TOKEN_SALE_INFO_REQUEST, {user})
export const fetchTokenSaleInfoSuccess = (rate: BigNumber, raised: BigNumber) => action(FETCH_TOKEN_SALE_INFO_SUCCESS, { rate, raised })
export const fetchTokenSaleInfoFailure = (error: string) => action(FETCH_TOKEN_SALE_INFO_FAILURE, { error })

export type FetchTokenSaleInfoRequestAction = ReturnType<typeof fetchTokenSaleInfoRequest>
export type FetchTokenSaleInfoSuccessAction = ReturnType<typeof fetchTokenSaleInfoSuccess>
export type FetchTokenSaleInfoFailureAction = ReturnType<typeof fetchTokenSaleInfoFailure>

/// Contribute Token
/// --------------------------------

export const CONTRIBUTE_TOKEN_REQUEST = '[Request] Contribute Token'
export const CONTRIBUTE_TOKEN_SUCCESS = '[Success] Contribute Token'
export const CONTRIBUTE_TOKEN_FAILURE = '[Failure] Contribute Token'

export const contributeTokenRequest = (user: string, amount: string) => action(CONTRIBUTE_TOKEN_REQUEST, { amount, user})
export const contributeTokenSuccess = (amount: string, chainId: ChainId, txHash: string) =>
  action(CONTRIBUTE_TOKEN_SUCCESS, { amount, ...buildTransactionPayload(chainId, txHash, amount) })
export const contributeTokenFailure = (error: string) => action(CONTRIBUTE_TOKEN_FAILURE, { error })

export type ContributeTokenRequestAction = ReturnType<typeof contributeTokenRequest>
export type ContributeTokenSuccessAction = ReturnType<typeof contributeTokenSuccess>
export type ContributeTokenFailureAction = ReturnType<typeof contributeTokenFailure>
