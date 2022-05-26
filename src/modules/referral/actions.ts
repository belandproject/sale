import { AuthChain } from 'beland-crypto'
import { action } from 'typesafe-actions'

/// FETCH LAND AUCTION PRICE
/// --------------------------------

export const FETCH_REFERRAL_CODE_REQUEST = '[Request] Fetch referral code'
export const FETCH_REFERRAL_CODE_SUCCESS = '[Success] Fetch referral code'
export const FETCH_REFERRAL_CODE_FAILURE = '[Failure] Fetch referral code'

export const fetchReferralCodeRequest = (authChain: AuthChain) => action(FETCH_REFERRAL_CODE_REQUEST, { authChain })
export const fetchReferralCodeSuccess = (code: string) => action(FETCH_REFERRAL_CODE_SUCCESS, { code })
export const fetchReferralCodeFailure = (error: string) => action(FETCH_REFERRAL_CODE_FAILURE, { error })

export type FetchReferralCodeRequestAction = ReturnType<typeof fetchReferralCodeRequest>
export type FetchReferralCodeSuccessAction = ReturnType<typeof fetchReferralCodeSuccess>
export type FetchReferralCodeFailureAction = ReturnType<typeof fetchReferralCodeFailure>


export const SAVE_REFERRER = '[Save] Referrer'
export const saveReferrerSuccess = (referrer: string) => action(SAVE_REFERRER, { referrer })
export type  SaveReferrerAction = ReturnType<typeof saveReferrerSuccess>
