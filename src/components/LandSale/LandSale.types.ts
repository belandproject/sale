import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { AtlasTile } from '@beland/uikit'
import { fetchTilesRequest, FetchTilesRequestAction } from 'modules/tile/actions'
import { claimLandRequest, ClaimLandRequestAction, fetchLandPriceRequest, FetchLandSalePriceRequestAction } from 'modules/landSale/actions'
import { grantTokenRequest, GrantTokenRequestAction } from '@beland/dapps/dist/modules/authorization/actions'
import { Wallet } from '@beland/dapps/dist/modules/wallet/types'
import { Authorization } from '@beland/dapps/dist/modules/authorization/types'
import BigNumber from 'bignumber.js'

export type DefaultProps = {
  tiles: Record<string, AtlasTile>
  fetchTiles: typeof fetchTilesRequest
  fetchLandSalePrice: typeof fetchLandPriceRequest
  claim: typeof claimLandRequest
  isConnected: boolean
  isLoading: boolean
  price: BigNumber
  wallet: Wallet | null
  authorizations: Authorization[]
  grantToken: typeof grantTokenRequest
}

export type Props = DefaultProps

export type State = {
  selected: Array<string>
  auctionEndTime: number
  auctionStartTime: number
  countdownCompleted: number
}

export type MapStateProps = Pick<Props, 'tiles' | 'isConnected' | 'price' | 'wallet' | 'authorizations' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'fetchTiles' | 'fetchLandSalePrice' | 'claim' | 'grantToken'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | FetchTilesRequestAction | FetchLandSalePriceRequestAction | ClaimLandRequestAction | GrantTokenRequestAction
>
