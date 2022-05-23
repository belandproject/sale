import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './LandSale.types'
import LandSale from './LandSale'
import { getTiles } from 'modules/tile/selectors'
import { RootState } from 'modules/common/types'
import { fetchTilesRequest } from 'modules/tile/actions'

const mapState = (state: RootState): MapStateProps => ({
    tiles: getTiles(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
    fetchTiles: () => {
        return dispatch(fetchTilesRequest());
    }
})

export default connect(mapState, mapDispatch)(LandSale)
