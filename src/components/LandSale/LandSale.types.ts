import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { AtlasTile } from '@beland/uikit'
import { fetchTilesRequest, FetchTilesRequestAction } from 'modules/tile/actions'
import { fetchLandPriceRequest, FetchLandSalePriceRequestAction } from 'modules/landSale/actions'

export type DefaultProps = {
  tiles: Record<string, AtlasTile>
  fetchTiles: typeof fetchTilesRequest
  fetchLandSalePrice: typeof fetchLandPriceRequest
  isConnected: boolean
  price: number
}

export type Props = DefaultProps

export type State = {
  selected: Array<string>
  auctionEndTime: number
  auctionStartTime: number
  countdownCompleted: number
}

export type MapStateProps = Pick<Props, 'tiles' | 'isConnected' | 'price'>
export type MapDispatchProps = Pick<Props, 'fetchTiles' | 'fetchLandSalePrice'>
export type MapDispatch = Dispatch<CallHistoryMethodAction | FetchTilesRequestAction | FetchLandSalePriceRequestAction>
