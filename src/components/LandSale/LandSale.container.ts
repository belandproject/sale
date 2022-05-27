import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './LandSale.types'
import LandSale from './LandSale'
import { getTiles } from 'modules/tile/selectors'
import { RootState } from 'modules/common/types'
import { fetchTilesRequest } from 'modules/tile/actions'
import { isConnected } from '@beland/dapps/dist/modules/wallet/selectors'
import { getData as getWallet } from '@beland/dapps/dist/modules/wallet/selectors'
import { getPrice, isLoading as landSaleLoading } from 'modules/landSale/selectors'
import { claimLandRequest, fetchLandPriceRequest } from 'modules/landSale/actions'
import { Authorization } from '@beland/dapps/dist/modules/authorization/types'
import { grantTokenRequest } from '@beland/dapps/dist/modules/authorization/actions'
import { getData as getAuthorizations, isLoading } from '@beland/dapps/dist/modules/authorization/selectors'

const mapState = (state: RootState): MapStateProps => ({
    tiles: getTiles(state),
    isConnected: isConnected(state),
    price: getPrice(state),
    wallet: getWallet(state),
    authorizations: getAuthorizations(state),
    isLoading: isLoading(state) || landSaleLoading(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
    fetchTiles: () => dispatch(fetchTilesRequest()),
    fetchLandSalePrice:  () => dispatch(fetchLandPriceRequest()),
    claim: (landIds: number[]) => dispatch(claimLandRequest(landIds)),
    grantToken: (authorization: Authorization) => dispatch(grantTokenRequest(authorization)),
})

export default connect(mapState, mapDispatch)(LandSale)
