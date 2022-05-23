import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { AtlasTile } from '@beland/uikit'
import { fetchTilesRequest, FetchTilesRequestAction } from 'modules/tile/actions'

export type DefaultProps = {
    tiles: Record<string, AtlasTile>
    fetchTiles: typeof fetchTilesRequest
    isConnected: boolean
}

export type Props = DefaultProps


export type State = {
    selected: Array<string>
    auctionEndTime: number
    auctionStartTime: number
    countdownCompleted: number
}

export type MapStateProps = Pick<Props, "tiles" | 'isConnected'>
export type MapDispatchProps = Pick<Props, "fetchTiles">
export type MapDispatch = Dispatch<CallHistoryMethodAction | FetchTilesRequestAction>
