import { Reducer, Store } from 'redux'
import { action } from 'typesafe-actions'
import { ModalState } from '@beland/dapps/dist/modules/modal/reducer'
import { StorageState } from '@beland/dapps/dist/modules/storage/reducer'
import { WalletState } from '@beland/dapps/dist/modules/wallet/reducer'
import { STORAGE_LOAD } from '@beland/dapps/dist/modules/storage/actions'
import { ToastState } from '@beland/dapps/dist/modules/toast/reducer'
import { RouterState } from 'connected-react-router'
import { IdentityState } from 'modules/identity/reducer'
const storageLoad = () => action(STORAGE_LOAD, {} as RootState)
export type StorageLoadAction = ReturnType<typeof storageLoad>

export type RootState = {
  modal: ModalState
  wallet: WalletState
  router: RouterState
  storage: StorageState,
  toast: ToastState
  identity: IdentityState

}

export type RootStore = Store<RootState>
export type RootReducer = Reducer<RootState>
