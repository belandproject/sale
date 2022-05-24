import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { modalReducer as modal } from '@beland/dapps/dist/modules/modal/reducer'
import { storageReducer as storage, storageReducerWrapper } from '@beland/dapps/dist/modules/storage/reducer'
import { walletReducer as wallet } from '@beland/dapps/dist/modules/wallet/reducer'
import { toastReducer as toast } from '@beland/dapps/dist/modules/toast/reducer'
import { identityReducer as identity } from 'modules/identity/reducer'
import { tileReducer as tile } from 'modules/tile/reducer'
import { translationReducer as translation } from '@beland/dapps/dist/modules/translation/reducer'
import { landSaleReducer as landSale } from 'modules/landSale/reducer'
import { transactionReducer as transaction } from '@beland/dapps/dist/modules/transaction/reducer'
import { authorizationReducer as authorization } from '@beland/dapps/dist/modules/authorization/reducer'


import { RootState } from 'modules/common/types'
export function createRootReducer(history: History) {
  return storageReducerWrapper(
    combineReducers<RootState>({
      modal,
      router: connectRouter(history),
      wallet,
      storage,
      toast,
      identity,
      tile,
      translation,
      landSale,
      transaction,
      authorization
    })
  )
}
