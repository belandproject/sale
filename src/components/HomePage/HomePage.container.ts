import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps } from './HomePage.types'
import HomePage from './HomePage'

const mapState = (): MapStateProps => ({})

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
