import * as React from 'react'
import { Container, Page, Input } from '@beland/uikit'

import Footer from 'components/Footer'
import { Props, State } from './HomePage.types'
import './HomePage.css'
import LandCountdown from 'components/LandSale/components/LandCountdown/LandCountdown'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { getBalanceAmount, getBalanceNumber, getDecimalAmount } from 'lib/formatBalance'
import ConnectButton from 'components/ConnectButton'
import { NetworkButton } from '@beland/dapps/dist/containers'
import { Network } from '@beland/schemas'

const START_TIME = 1653385109000
const END_TIME = 1653989909000
const CAP = new BigNumber('100000000000000000000000000')
const ONE_KAI = new BigNumber('1000000000000000000')

const KaiIcon = () => {
  return (
    <i className="icon">
      <img width={30} height={30} src="https://s2.coinmarketcap.com/static/img/coins/64x64/5453.png" />
    </i>
  )
}

export default class HomePage extends React.PureComponent<Props> {
  state: State = {
    countdownStep: 1,
    contributeAmount: 0
  }

  inteval: any

  componentDidMount(): void {
    this.props.fetchTokenSaleInfo(this.props.address)
    this.inteval = setInterval(() => {
      this.props.fetchTokenSaleInfo(this.props.address)
    }, 5000)
  }

  componentWillUnmount(): void {
    clearInterval(this.inteval)
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

  handleChangeContributeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ contributeAmount: event.target.value })
  }

  handleContribute = () => {
    if (!this.props.address) return
    this.props.contribute(this.props.address, getDecimalAmount(new BigNumber(this.state.contributeAmount)))
    this.setState({ contributeAmount: 0 })
  }

  renderButton = () => {
    if (!this.props.isConnected) {
      return <ConnectButton primary />
    }

    return (
      <NetworkButton
        network={Network.KAI}
        disabled={this.props.isLoading || !this.state.contributeAmount}
        onClick={this.handleContribute}
        primary
      >
        Contribute KAI
      </NetworkButton>
    )
  }

  render() {
    const contributeAmount = getDecimalAmount(new BigNumber(this.state.contributeAmount))
    const beanReceive = contributeAmount.multipliedBy(this.props.rate).div(new BigNumber(100))
    const price = ONE_KAI.div(this.props.rate.div(new BigNumber(100)))
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
                <ProgressBar value={getBalanceAmount(this.props.raised)} max={getBalanceAmount(CAP)} />
              </div>

              <div className="price">
                <span>Price: </span> <Balance value={getBalanceNumber(price)} decimals={5} subfix=" KAI" prefix="" />
              </div>

              <div className="form">
                <Input
                  onChange={this.handleChangeContributeAmount}
                  value={this.state.contributeAmount}
                  placeholder={'0.00'}
                  iconPosition="left"
                  focus={true}
                  icon={<KaiIcon />}
                />
                <div className="bean_receive">
                  <b>You will receive</b> <Balance value={getBalanceNumber(beanReceive)} subfix={' BEAN'} decimals={5} />
                </div>
                {this.renderButton()}
              </div>
            </div>
          </Container>
        </Page>
        <Footer />
      </>
    )
  }
}
