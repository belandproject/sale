import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'
import HomePage from './HomePage'
import { RootState } from 'modules/common/types'
import { getData, isLoading } from 'modules/tokenSale/selectors'
import { contributeTokenRequest, fetchTokenSaleInfoRequest } from 'modules/tokenSale/actions'
import { getAddress, isConnected } from '@beland/dapps/dist/modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
    isLoading: isLoading(state),
    rate: getData(state).rate,
    raised: getData(state).raised,
    isConnected: isConnected(state),
    address: getAddress(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
    fetchTokenSaleInfo: (user: string | undefined) => dispatch(fetchTokenSaleInfoRequest(user)),
    contribute: (user: string, amount: string) => dispatch(contributeTokenRequest(user, amount))
})

export default connect(mapState, mapDispatch)(HomePage)
