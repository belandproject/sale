import { ChainId } from '@beland/schemas'
import { action } from 'typesafe-actions'
import { buildTransactionPayload } from '@beland/dapps/dist/modules/transaction/utils'
import BigNumber from 'bignumber.js'

/// FETCH LAND AUCTION PRICE
/// --------------------------------

export const FETCH_LAND_SALE_PRICE_REQUEST = '[Request] Fetch Land Sale Price'
export const FETCH_LAND_SALE_PRICE_SUCCESS = '[Success] Fetch Land Sale Price'
export const FETCH_LAND_SALE_PRICE_FAILURE = '[Failure] Fetch Land Sale Price'

export const fetchLandPriceRequest = () => action(FETCH_LAND_SALE_PRICE_REQUEST)
export const fetchLandPriceSuccess = (price: BigNumber) =>
  action(FETCH_LAND_SALE_PRICE_SUCCESS, { price })
export const fetchLandPriceFailure = (error: string) =>
  action(FETCH_LAND_SALE_PRICE_FAILURE, { error })


export type FetchLandSalePriceRequestAction = ReturnType<typeof fetchLandPriceRequest>
export type FetchLandSalePriceSuccessAction = ReturnType<typeof fetchLandPriceSuccess>
export type FetchLandSalePriceFailureAction = ReturnType<typeof fetchLandPriceFailure>


/// Claim Land
/// --------------------------------

export const CLAIM_LAND_REQUEST = '[Request] Claim land'
export const CLAIM_LAND_SUCCESS = '[Success] Claim land'
export const CLAIM_LAND_FAILURE = '[Failure] Claim land'


export const claimLandRequest = (landIds: number[]) =>
  action(CLAIM_LAND_REQUEST, { landIds })

export const claimLandSuccess = (landIds: number[],  chainId: ChainId, txHash: string) => 
  action(CLAIM_LAND_SUCCESS, { landIds, chainId, ...buildTransactionPayload(chainId, txHash, { landIds })})

export const claimLandFailure = (landIds: number[],  error: string) => 
  action(CLAIM_LAND_FAILURE, { landIds, error})

export type ClaimLandRequestAction = ReturnType<typeof claimLandRequest>
export type ClaimLandSuccessAction = ReturnType<typeof claimLandSuccess>
export type ClaimLandFailureAction = ReturnType<typeof claimLandFailure>