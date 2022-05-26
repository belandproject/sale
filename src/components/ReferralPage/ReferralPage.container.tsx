import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ReferralPage.types'
import ReferralPage from './ReferralPage'
import { RootState } from 'modules/common/types'
import { getData } from 'modules/referral/selectors'

const mapState = (state: RootState): MapStateProps => ({
    code: getData(state).code
})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(ReferralPage)
