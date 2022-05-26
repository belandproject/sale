import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Center, Page } from '@beland/uikit'
import { env } from 'decentraland-commons'
import { t } from '@beland/dapps/dist/modules/translation/utils'


import { locations } from 'routing/locations'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import HomePage from 'components/HomePage'
import LandSale from 'components/LandSale'
import ReferralPage from 'components/ReferralPage'

import { Props, State } from './Routes.types'
import './Routes.css'

export default class Routes extends React.Component<Props, State> {
  state = {
    hasError: false,
    stackTrace: ''
  }

  componentDidCatch(err: Error) {
    this.setState({
      hasError: true,
      stackTrace: err.stack || 'No details avaibale'
    })
  }

  componentDidMount() {
    document.body.classList.remove('loading-overlay')
  }

  renderMaintainancePage() {
    return (
      <>
        <Navbar />
        <Page>
          <Center>🚧 {t('maintainance.notice')} 🚧</Center>
        </Page>
        <Footer />
      </>
    )
  }

  renderRoutes() {
    if (env.get('REACT_APP_UNDER_MAINTAINANCE')) {
      return this.renderMaintainancePage()
    }

    return (
      <>
        <Navbar/>
        <Switch>
          <Route exact path={locations.root()} component={HomePage} />
          <Route exact path={locations.land()} component={LandSale} />
          <Route exact path={locations.referral()} component={ReferralPage} />
        </Switch>
      </>
    )
  }

  render() {
    return <>{this.renderRoutes()}</>
  }
}
