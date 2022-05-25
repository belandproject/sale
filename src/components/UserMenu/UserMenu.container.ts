import { connect } from 'react-redux'
import { isConnected, isConnecting } from '@beland/dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/common/types'
import { logout } from '../../modules/identity/actions'
import { MapStateProps, MapDispatch, MapDispatchProps } from './UserMenu.types'
import UserMenu from './UserMenu'

const mapState = (state: RootState): MapStateProps => {
  return {
    isSignedIn: isConnected(state),
    isSigningIn: isConnecting(state),
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignOut: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(UserMenu)
