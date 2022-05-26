import { Authenticator, AuthIdentity } from 'beland-crypto'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import { fetchReferralCodeFailure, fetchReferralCodeSuccess, saveReferrerSuccess } from './actions'
import { FETCH_WALLET_SUCCESS } from '@beland/dapps/dist/modules/wallet/actions'
import { LOGIN_SUCCESS } from 'modules/identity/actions'
import { getIdentity } from 'modules/identity/utils'
import { getData } from './selectors'

export function getReferralEndpoint() {
  return `https://nft-api-test.beland.io/v1/referrals`
}

export function* referralSaga() {
  yield takeEvery(FETCH_WALLET_SUCCESS, handleFetchReferralCodeRequest)
  yield takeEvery(LOGIN_SUCCESS, handleFetchReferralCodeRequest)
  yield call(saveReferral)
}

function* handleFetchReferralCodeRequest() {
  try {
    const identity: AuthIdentity | undefined = yield getIdentity()
    if (!identity) return;
    const ref: { code: string } = yield call(fetchReferralCode, identity)
    yield recordReferrer(identity);
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


function* saveReferral() {
  const params = new URLSearchParams(location.search)
  const code = params.get('referrer')
  if (code) {
    params.delete('referrer')
    history.replaceState(history.state, document.title,  '?' + params.toString())
    yield put(saveReferrerSuccess(code))
  }
}


function* recordReferrer(identity: AuthIdentity) {
  const data : {referrer: string} = yield select(getData)
  yield call(_recordReferrer, identity, data.referrer)
  yield put(saveReferrerSuccess(''))
}


async function _recordReferrer(_identity: AuthIdentity, _referrerCode: string) {

}