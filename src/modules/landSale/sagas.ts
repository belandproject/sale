import { env } from 'decentraland-commons'
import { takeEvery, put } from 'redux-saga/effects'
import { fetchLandPriceFailure, fetchLandPriceSuccess, FetchLandSalePriceRequestAction, FETCH_LAND_SALE_PRICE_REQUEST } from './actions'

export const MARKETPLACE_URL = env.get('REACT_APP_HUB_SERVER_URL', '')

export function* landSaleSaga() {
  yield takeEvery(FETCH_LAND_SALE_PRICE_REQUEST, handleFetchLandSalePriceRequest)
}

function* handleFetchLandSalePriceRequest(_action: FetchLandSalePriceRequestAction) {
  try {
    yield put(fetchLandPriceSuccess(Math.random() * 10000000))
  } catch (error) {
    yield put(fetchLandPriceFailure(error.message))
  }
}
