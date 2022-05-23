import { action } from 'typesafe-actions'

export const FETCH_LAND_SALE_PRICE_REQUEST = '[Request] Fetch Land Sale Price'
export const FETCH_LAND_SALE_PRICE_SUCCESS = '[Success] Fetch Land Sale Price'
export const FETCH_LAND_SALE_PRICE_FAILURE = '[Failure] Fetch Land Sale Price'

export const fetchLandPriceRequest = () => action(FETCH_LAND_SALE_PRICE_REQUEST)
export const fetchLandPriceSuccess = (price: number) =>
  action(FETCH_LAND_SALE_PRICE_SUCCESS, { price })
export const fetchLandPriceFailure = (error: string) =>
  action(FETCH_LAND_SALE_PRICE_FAILURE, { error })


  export type FetchLandSalePriceRequestAction = ReturnType<typeof fetchLandPriceRequest>
export type FetchLandSalePriceSuccessAction = ReturnType<typeof fetchLandPriceSuccess>
export type FetchLandSalePriceFailureAction = ReturnType<typeof fetchLandPriceFailure>
