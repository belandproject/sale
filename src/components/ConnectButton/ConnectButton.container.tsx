import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './ConnectButton.types'
import ConnectButton from './ConnectButton'
import { openModal } from 'modules/modal/actions'

const mapState = (): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(openModal('WalletLoginModal', {}))
})

const mergeProps = (mapStateProps: MapStateProps, mapDispatchProps: MapDispatchProps, ownProps: OwnProps) => ({
  ...mapStateProps,
  ...mapDispatchProps,
  ...ownProps
})

export default connect(mapState, mapDispatch, mergeProps)(ConnectButton)
