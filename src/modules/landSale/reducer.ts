import { LoadingState, loadingReducer } from '@beland/dapps/dist/modules/loading/reducer'
import {
  FetchLandSalePriceFailureAction,
  FetchLandSalePriceRequestAction,
  FetchLandSalePriceSuccessAction,
  FETCH_LAND_SALE_PRICE_FAILURE,
  FETCH_LAND_SALE_PRICE_REQUEST,
  FETCH_LAND_SALE_PRICE_SUCCESS
} from './actions'

export type LandSaleState = {
  data: { price: number }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: LandSaleState = {
  data: { price: 0 },
  loading: [],
  error: null
}

type LandSaleReducerAction = FetchLandSalePriceRequestAction | FetchLandSalePriceFailureAction | FetchLandSalePriceSuccessAction

export function landSaleReducer(state = INITIAL_STATE, action: LandSaleReducerAction) {
  switch (action.type) {
    case FETCH_LAND_SALE_PRICE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_LAND_SALE_PRICE_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          price: action.payload.price
        }
      }
    }
    case FETCH_LAND_SALE_PRICE_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
