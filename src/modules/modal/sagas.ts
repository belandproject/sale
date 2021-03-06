import { LOCATION_CHANGE } from 'connected-react-router'
import { delay, put, select, takeEvery } from 'redux-saga/effects'
import { ModalState } from '@beland/dapps/dist/modules/modal/reducer'
import { getOpenModals } from '@beland/dapps/dist/modules/modal/selectors'
import { closeAllModals } from './actions'

export function* modalSaga() {
  yield takeEvery(LOCATION_CHANGE, handleLocationChange)
}

function* handleLocationChange() {
  const openModals: ModalState = yield select(getOpenModals)
  if (Object.keys(openModals).length > 0) {
    yield delay(100)
    yield handleCloseAllModals()
  }
}

function* handleCloseAllModals() {
  yield put(closeAllModals())
}
