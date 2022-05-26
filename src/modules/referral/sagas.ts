import { Authenticator, AuthIdentity } from 'beland-crypto'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import { fetchReferralCodeFailure, fetchReferralCodeSuccess } from './actions'
import { FETCH_WALLET_SUCCESS } from '@beland/dapps/dist/modules/wallet/actions'
import { getCurrentIdentity } from 'modules/identity/selectors'

export function getReferralEndpoint() {
  return `https://nft-api-test.beland.io/v1/referrals`
}

export function* referralSaga() {
  yield takeEvery(FETCH_WALLET_SUCCESS, handleFetchReferralCodeRequest)
}

function* handleFetchReferralCodeRequest() {
  try {
    const identity: AuthIdentity = yield select(getCurrentIdentity)
    const ref: { code: string } = yield call(fetchReferralCode, identity)
    yield put(fetchReferralCodeSuccess(ref.code))
  } catch (error) {
    yield put(fetchReferralCodeFailure(error.message))
  }
}

async function fetchReferralCode(identity: AuthIdentity) {
  const endpoint = getReferralEndpoint()
  let res = await fetch(endpoint + `?address=${identity.authChain[0].payload}`).then(response => response.json())
  if (res.rows.length > 0) {
    return res.rows[0]
  }
  return createReferralCode(identity)
}

async function createReferralCode(identity: AuthIdentity) {
  const endpoint = getReferralEndpoint()
  const authLinks = Authenticator.signPayload(identity, 'post:/referrals')
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + btoa(JSON.stringify(authLinks)),
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  return res.code
}
