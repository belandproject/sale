import { loadingReducer, LoadingState } from '@beland/dapps/dist/modules/loading/reducer'
import { BigNumber } from 'bignumber.js'

import { FetchTokenSaleInfoFailureAction, FetchTokenSaleInfoRequestAction, FetchTokenSaleInfoSuccessAction, FETCH_TOKEN_SALE_INFO_FAILURE, FETCH_TOKEN_SALE_INFO_REQUEST, FETCH_TOKEN_SALE_INFO_SUCCESS } from './actions'

export type TokenSaleState = {
  data: { rate: BigNumber, raised: BigNumber }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: TokenSaleState = {
  data: { rate: new BigNumber(0), raised: new BigNumber(0) },
  loading: [],
  error: null
}

type TokenSaleReducerAction = FetchTokenSaleInfoRequestAction | FetchTokenSaleInfoSuccessAction | FetchTokenSaleInfoFailureAction

export function tokenSaleReducer(state = INITIAL_STATE, action: TokenSaleReducerAction) {
  switch (action.type) {
    case FETCH_TOKEN_SALE_INFO_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_TOKEN_SALE_INFO_SUCCESS: {
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: loadingReducer(state.loading, action),
      }
    }
    case FETCH_TOKEN_SALE_INFO_FAILURE: {
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
