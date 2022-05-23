import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { AtlasTile } from '@beland/uikit'
import { fetchTilesRequest, FetchTilesRequestAction } from 'modules/tile/actions'

export type DefaultProps = {
    tiles: Record<string, AtlasTile>
    fetchTiles: typeof fetchTilesRequest
}

export type Props = DefaultProps


export type State = {
    selected: Array<string>
    auctionEndTime: number
    auctionStartTime: number
}

export type MapStateProps = Pick<Props, "tiles">
export type MapDispatchProps = Pick<Props, "fetchTiles">
export type MapDispatch = Dispatch<CallHistoryMethodAction | FetchTilesRequestAction>
