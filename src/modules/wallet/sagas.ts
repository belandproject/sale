import { all, takeEvery, put } from 'redux-saga/effects'
import { ChainId } from '@beland/schemas'
import { env } from 'decentraland-commons'
import { createWalletSaga } from '@beland/dapps/dist/modules/wallet/sagas'
import {
  CHANGE_ACCOUNT,
  CHANGE_NETWORK,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  ConnectWalletSuccessAction
} from '@beland/dapps/dist/modules/wallet/actions'
import { fetchAuthorizationsRequest } from '@beland/dapps/dist/modules/authorization/actions'
import { Authorization, AuthorizationType } from '@beland/dapps/dist/modules/authorization/types'
import { TRANSACTIONS_API_URL } from './utils'
import { ContractName, getContract } from '@beland/transactions'
import { LAND_AUCTION_CONTRACT } from 'modules/landSale/sagas'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: env.get('REACT_APP_CHAIN_ID') || ChainId.KAI_MAINNET,
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL
})


export function* walletSaga() {
  yield all([baseWalletSaga(), customWalletSaga()])
}

function* customWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWalletChange) 
  yield takeEvery(CHANGE_ACCOUNT, handleWalletChange)
  yield takeEvery(CHANGE_NETWORK, handleWalletChange)
}

function* handleWalletChange(action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction) {
  const { wallet } = action.payload
  const chainId = wallet.networks.KAI.chainId
  // All authorizations to be fetched must be added to the following list
  const authorizations: Authorization[] = [
    {
      address: wallet.address,
      chainId: chainId,
      contractAddress: getContract(ContractName.BEAN, chainId).address,
      authorizedAddress: LAND_AUCTION_CONTRACT,
      contractName: ContractName.BEAN as any,
      type: AuthorizationType.ALLOWANCE
    }
  ]

  yield put(fetchAuthorizationsRequest(authorizations))
}
