import { all } from 'redux-saga/effects'
import { walletSaga } from 'modules/wallet/sagas'
export function* rootSaga() {
  yield all([
    walletSaga()
  ])
}
