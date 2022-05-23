import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './LandSale.types'
import LandSale from './LandSale'
import { getTiles } from 'modules/tile/selectors'
import { RootState } from 'modules/common/types'
import { fetchTilesRequest } from 'modules/tile/actions'
import { isConnected } from '@beland/dapps/dist/modules/wallet/selectors'
import { getPrice } from 'modules/landSale/selectors'
import { fetchLandPriceRequest } from 'modules/landSale/actions'

const mapState = (state: RootState): MapStateProps => ({
    tiles: getTiles(state),
    isConnected: isConnected(state),
    price: getPrice(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
    fetchTiles: () => dispatch(fetchTilesRequest()),
    fetchLandSalePrice:  () => dispatch(fetchLandPriceRequest()),
})

export default connect(mapState, mapDispatch)(LandSale)
