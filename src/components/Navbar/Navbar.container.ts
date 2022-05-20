import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, OwnProps } from './Navbar.types'
import Navbar from './Navbar'

const mapState = (): MapStateProps => ({
})

const mapDispatch = (): MapDispatchProps => ({
})

const mergeProps = (mapStateProps: MapStateProps, mapDispatchProps: MapDispatchProps, ownProps: OwnProps) => ({
  ...mapStateProps,
  ...mapDispatchProps,
  ...ownProps
})

export default connect(mapState, mapDispatch, mergeProps)(Navbar)
