import { ChainId } from '@beland/schemas'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  claimLandFailure,
  ClaimLandRequestAction,
  claimLandSuccess,
  CLAIM_LAND_REQUEST,
  fetchLandPriceFailure,
  fetchLandPriceSuccess,
  FetchLandSalePriceRequestAction,
  FETCH_LAND_SALE_PRICE_REQUEST
} from './actions'
import LandAuctionABI from 'abi/LandAuction.json'
import { getConnectedProvider, getNetworkProvider } from '@beland/dapps/dist/lib/eth'
import { Contract, ethers } from 'ethers'
import { fetchAuthorizationsRequest, GrantTokenSuccessAction, GRANT_TOKEN_SUCCESS } from '@beland/dapps/dist/modules/authorization/actions'
import { Provider } from '@beland/dapps/dist/modules/wallet/types'
import BigNumber from 'bignumber.js'
import { getReferUser } from 'modules/referral/selectors'
export const LAND_AUCTION_CONTRACT = '0x5744C567beD8A39A006f8FA9023632988CFd24D6'

export function* landSaleSaga() {
  yield takeEvery(FETCH_LAND_SALE_PRICE_REQUEST, handleFetchLandSalePriceRequest)
  yield takeEvery(CLAIM_LAND_REQUEST, handleClaimLandRequest)
  yield takeEvery(GRANT_TOKEN_SUCCESS, handleGrantTokenSuccessRequest)
}

function* handleFetchLandSalePriceRequest(_action: FetchLandSalePriceRequestAction) {
  try {
    const price: BigNumber = yield call(getPrice)
    yield put(fetchLandPriceSuccess(price))
  } catch (error) {
    yield put(fetchLandPriceFailure(error.message))
  }
}

async function getPrice() {
  const provider: Provider = await getNetworkProvider(ChainId.KAI_MAINNET)
  const web3 = new ethers.providers.Web3Provider(provider as any)
  const contract: Contract = new ethers.Contract(LAND_AUCTION_CONTRACT, LandAuctionABI, web3)
  const price = await contract.getPrice()
  return new BigNumber(price.toString())
}

function* handleClaimLandRequest(_action: ClaimLandRequestAction) {
  try {
    const referUser: string = yield select(getReferUser)
    const tx: string = yield call(claim, _action.payload.landIds, referUser)
    yield put(claimLandSuccess(_action.payload.landIds, ChainId.KAI_MAINNET, tx))
  } catch (error) {
    yield put(claimLandFailure(_action.payload.landIds, error.message))
  }
}

function* handleGrantTokenSuccessRequest(action: GrantTokenSuccessAction) {
  yield put(fetchAuthorizationsRequest([action.payload.authorization]))
}

async function claim(landIds: number[], refer: string): Promise<string> {
  const provider = await getConnectedProvider()
  const web3 = new ethers.providers.Web3Provider(provider as any)
  const signer = web3.getSigner()
  const accounts = await web3.listAccounts()
  const contract: Contract = new ethers.Contract(LAND_AUCTION_CONTRACT, LandAuctionABI, signer)
  const tx = await contract.buy(accounts[0], landIds, refer ? refer : '0x0000000000000000000000000000000000000000')
  const reciept = await tx.wait()
  return reciept.transactionHash
}
