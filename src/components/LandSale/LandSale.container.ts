import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './LandSale.types'
import LandSale from './LandSale'
import { getTiles } from 'modules/tile/selectors'
import { RootState } from 'modules/common/types'
import { fetchTilesRequest } from 'modules/tile/actions'
import { isConnected } from '@beland/dapps/dist/modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
    tiles: getTiles(state),
    isConnected: isConnected(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
    fetchTiles: () => {
        return dispatch(fetchTilesRequest());
    }
})

export default connect(mapState, mapDispatch)(LandSale)
