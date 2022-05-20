import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { modalReducer as modal } from '@beland/dapps/dist/modules/modal/reducer'
import { storageReducer as storage, storageReducerWrapper } from '@beland/dapps/dist/modules/storage/reducer'
import { walletReducer as wallet } from '@beland/dapps/dist/modules/wallet/reducer'
import { toastReducer as toast } from '@beland/dapps/dist/modules/toast/reducer'

import { RootState } from 'modules/common/types'
export function createRootReducer(history: History) {
  return storageReducerWrapper(
    combineReducers<RootState>({
      modal,
      router: connectRouter(history),
      wallet,
      storage,
      toast
    })
  )
}
