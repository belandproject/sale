import { loadingReducer, LoadingState } from '@beland/dapps/dist/modules/loading/reducer'

import {
  FetchReferralCodeFailureAction,
  FetchReferralCodeRequestAction,
  FetchReferralCodeSuccessAction,
  FETCH_REFERRAL_CODE_FAILURE,
  FETCH_REFERRAL_CODE_REQUEST,
  FETCH_REFERRAL_CODE_SUCCESS
} from './actions'

export type ReferralState = {
  data: { code: string }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: ReferralState = {
  data: { code: '' },
  loading: [],
  error: null
}

type ReferralReducerAction = FetchReferralCodeRequestAction | FetchReferralCodeFailureAction | FetchReferralCodeSuccessAction

export function referralReducer(state = INITIAL_STATE, action: ReferralReducerAction) {
  switch (action.type) {
    case FETCH_REFERRAL_CODE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_REFERRAL_CODE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: loadingReducer(state.loading, action),
        data: {
          code: action.payload.code
        }
      }
    }
    case FETCH_REFERRAL_CODE_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: loadingReducer(state.loading, action)
      }
    }
    default:
      return state
  }
}
