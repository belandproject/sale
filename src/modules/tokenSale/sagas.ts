import { getConnectedProvider, getNetworkProvider } from '@beland/dapps/dist/lib/eth'
import { Provider } from '@beland/dapps/dist/modules/wallet/types'
import { ChainId } from '@beland/schemas'
import { Contract, ethers } from 'ethers'
import { BEAN_SALE_CONTRACT } from './utils'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    contributeTokenFailure,
    ContributeTokenRequestAction,
    contributeTokenSuccess,
    CONTRIBUTE_TOKEN_REQUEST,
  fetchTokenSaleInfoFailure,
  FetchTokenSaleInfoRequestAction,
  fetchTokenSaleInfoSuccess,
  FETCH_TOKEN_SALE_INFO_REQUEST
} from './actions'
import BEANSaleABI from 'abi/BeanSale.json'
import BigNumber from 'bignumber.js'

export function* tokenSaleSaga() {
  yield takeEvery(FETCH_TOKEN_SALE_INFO_REQUEST, handleFetchTokenSaleInfoRequest)
  yield takeEvery(CONTRIBUTE_TOKEN_REQUEST, handleContributeRequest)
}

function* handleFetchTokenSaleInfoRequest(action: FetchTokenSaleInfoRequestAction) {
  try {
    const info: { rate: BigNumber; raised: BigNumber } = yield call(getInfo, action.payload.user)
    yield put(fetchTokenSaleInfoSuccess(info.rate, info.raised))
  } catch (error) {
    yield put(fetchTokenSaleInfoFailure(error.message))
  }
}

async function getInfo(user: string | undefined) {
  const provider: Provider = await getNetworkProvider(ChainId.KAI_MAINNET)
  const web3 = new ethers.providers.Web3Provider(provider as any)
  const contract: Contract = new ethers.Contract(BEAN_SALE_CONTRACT, BEANSaleABI, web3)
  const [rate, raised] = await Promise.all([contract.getRate(user ? user : BEAN_SALE_CONTRACT), contract.raised()])
  return { rate: new BigNumber(rate.toString()), raised: new BigNumber(raised.toString()) }
}


function* handleContributeRequest(action: ContributeTokenRequestAction) {
    try {
        const tx: string = yield call(contribute, action.payload.user, action.payload.amount)
        yield put(contributeTokenSuccess(action.payload.amount, ChainId.KAI_MAINNET, tx))
    } catch (error) {
      yield put(contributeTokenFailure(error.message))
    }
  }


  async function contribute(user: string, amount: string): Promise<string> {
    const provider = await getConnectedProvider()
    const web3 = new ethers.providers.Web3Provider(provider as any)
    const signer = web3.getSigner()
    const contract: Contract = new ethers.Contract(BEAN_SALE_CONTRACT, BEANSaleABI, signer)
    const tx = await contract.buy(user, { value: amount})
    const reciept = await tx.wait()
    return reciept.transactionHash
  }
  