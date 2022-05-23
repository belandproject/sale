import { all } from 'redux-saga/effects'
import { walletSaga } from 'modules/wallet/sagas'
import { identitySaga } from 'modules/identity/sagas'
import { modalSaga } from 'modules/modal/sagas'
import { tileSaga } from 'modules/tile/sagas'
export function* rootSaga() {
  yield all([
    walletSaga(),
    identitySaga(),
    modalSaga(),
    tileSaga(),
  ])
}
