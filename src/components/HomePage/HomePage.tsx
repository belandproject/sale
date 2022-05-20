import * as React from 'react'
import { Page} from '@beland/uikit'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Props } from './HomePage.types'
import './HomePage.css'

export default class HomePage extends React.PureComponent<Props> {
  render() {
   
    return (
      <>
        <Navbar isFullscreen />
        <Page isFullscreen className="HomePage">
          1 
        </Page>
        <Footer />
      </>
    )
  }
}
