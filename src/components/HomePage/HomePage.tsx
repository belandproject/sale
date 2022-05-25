import * as React from 'react'
import { Container, Page, Field, Button } from '@beland/uikit'

import Footer from 'components/Footer'
import { Props, State } from './HomePage.types'
import './HomePage.css'
import LandCountdown from 'components/LandSale/components/LandCountdown/LandCountdown'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'

const START_TIME = 1653385109000
const END_TIME = 1653989909000
const CAP = new BigNumber(100000000)

const KaiIcon = () => {
  return (
    <i className="icon">
      <img width={30} height={30} src="https://s2.coinmarketcap.com/static/img/coins/64x64/5453.png" />
    </i>
  )
}

export default class HomePage extends React.PureComponent<Props> {
  state: State = {
    countdownStep: 1
  }

  handleCountdownComplete = () => {
    this.setState({ countdownStep: this.state.countdownStep++ })
  }

  renderTitle = () => {
    const now = Date.now()
    if (START_TIME > now) {
      return <h1>Token Sale will start in</h1>
    } else if (END_TIME > now) {
      return <h1>Token Sale is live!</h1>
    } else {
      return <h1>Token Sale has ended</h1>
    }
  }

  render() {
    return (
      <>
        <Page isFullscreen className="HomePage">
          <Container textAlign="center">
            <div className="sale">
              <div className="token_sale_title">{this.renderTitle()}</div>
              <LandCountdown
                key={this.state.countdownStep}
                startTime={START_TIME}
                endTime={END_TIME}
                onComplete={this.handleCountdownComplete}
              />
              <div className="token-progress">
                <ProgressBar value={new BigNumber(50000000)} max={CAP} />
              </div>

              <div className="price">
                <span>Price: </span> <Balance value={1000} decimals={3} subfix=" KAI" prefix="" />
              </div>

              <div className='form'>
                <Field placeholder={"0.00"} iconPosition='left' focus={true} icon={<KaiIcon />} />
                <div className='bean_receive' ><b>You will receive</b>  <Balance value={10} prefix="~" subfix={' BEAN'} decimals={5}/></div>
                <Button primary>Contribute KAI</Button>
              </div>
            </div>
          </Container>
        </Page>
        <Footer />
      </>
    )
  }
}
