import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './Navbar.types'
import Navbar from './Navbar'
import { openModal } from 'modules/modal/actions'
import { RootState } from 'modules/common/types'
import { isConnected } from '@beland/dapps/dist/modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(openModal('WalletLoginModal', {}))
  
})

const mergeProps = (mapStateProps: MapStateProps, mapDispatchProps: MapDispatchProps, ownProps: OwnProps) => ({
  ...mapStateProps,
  ...mapDispatchProps,
  ...ownProps
})

export default connect(mapState, mapDispatch, mergeProps)(Navbar)
