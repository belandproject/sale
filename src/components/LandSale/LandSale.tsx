import * as React from 'react'
import { Atlas, Container, Layer, Page } from '@beland/uikit'

import Footer from 'components/Footer'
import { Props, State } from './LandSale.types'
import './LandSale.css'
import LandCountdown from './components/LandCountdown/LandCountdown'
import { ChainButton } from '@beland/dapps/dist/containers'
import { ChainId } from '@beland/schemas'
import ConnectButton from 'components/ConnectButton'
import { Wallet } from '@beland/dapps/dist/modules/wallet/types'
import { LAND_AUCTION_CONTRACT } from 'modules/landSale/sagas'
import { ContractName, getContract } from '@beland/transactions'
import { AuthorizationType } from '@beland/dapps/dist/modules/authorization/types'
import { hasAuthorization } from '@beland/dapps/dist/modules/authorization/utils'
import { BigNumber, ethers } from 'ethers'

function getAuthorization(wallet: Wallet) {
  return {
    address: wallet.address,
    chainId: wallet.chainId,
    contractAddress: getContract(ContractName.BEAN, wallet.chainId).address,
    authorizedAddress: LAND_AUCTION_CONTRACT,
    contractName: ContractName.BEAN,
    type: AuthorizationType.ALLOWANCE
  }
}

export default class LandSale extends React.PureComponent<Props> {
  state: State = {
    selected: [],
    auctionEndTime: 1653989909000,
    auctionStartTime:  1653385109000,
    countdownCompleted: 0
  }

  inteval: any

  componentDidMount(): void {
    this.props.fetchTiles()
    this.props.fetchLandSalePrice()
    this.inteval = setInterval(() => {
      this.props.fetchTiles(), this.props.fetchLandSalePrice()
    }, 5000)
  }

  isApproved = () => {
    if (!this.props.wallet) return false
    return hasAuthorization(this.props.authorizations, getAuthorization(this.props.wallet))
  }

  componentWillUnmount(): void {
    clearInterval(this.inteval)
  }

  handleClick = (x: number, y: number): void => {
    const { tiles } = this.props
    const key = `${x},${y}`
    if (tiles[key]) return

    const { selected } = this.state
    const isSelected = this.isSelected(x, y)
    if (!isSelected) {
      selected.push(key)
    } else {
      selected.splice(selected.indexOf(key), 1)
    }
    this.setState({ selected })
  }

  isSelected = (x: number, y: number): boolean => {
    const key = `${x},${y}`
    return this.getSelectedLands().includes(key)
  }

  selectedStrokeLayer: Layer = (x, y) => {
    return this.isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
  }

  selectedFillLayer: Layer = (x, y) => {
    return this.isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
  }

  reset = () => {
    this.setState({ selected: [] })
  }

  renderSelectedLands = () => {
    const selected = this.getSelectedLands()
    if (selected.length == 0) {
      return <span>Select the LANDs that will claim</span>
    }
    return (
      <div>
        Select {selected.length} Lands at {selected.map(land => `(${land})`).join(', ')}{' '}
        <span className="reset" onClick={this.reset}>
          RESET
        </span>
      </div>
    )
  }

  renderTitle = () => {
    const now = Date.now()
    const { auctionStartTime, auctionEndTime } = this.state
    if (auctionStartTime > now) {
      return <h1>Land Auction will start in</h1>
    } else if (auctionEndTime > now) {
      return <h1>Land Auction is live!</h1>
    } else {
      return <h1>Auction has ended</h1>
    }
  }

  handleCountdownComplete = () => {
    return this.setState({ countdownCompleted: this.state.countdownCompleted++ })
  }

  isLive() {
    const { auctionStartTime, auctionEndTime } = this.state
    const now = Date.now()
    return auctionStartTime < now && auctionEndTime > now
  }

  isEnd() {
    const { auctionEndTime } = this.state
    const now = Date.now()
    return auctionEndTime <= now
  }

  handleClaim = () => {
    this.props.claim(
      this.getSelectedLands().map((raw: string) => {
        const coord = raw.split(',')
        return ((Number(coord[0]) + 150) % 300) + (Number(coord[1]) + 150) * 300
      })
    )
  }

  getSelectedLands = (): string[] => {
    return this.state.selected.filter(item => !this.props.tiles[item])
  }

  handleGrantToken = () => {
    if (!this.props.wallet) return
    const authorization = getAuthorization(this.props.wallet)
    return this.props.grantToken(authorization)
  }

  renderClaimBtn = () => {
    if (this.isApproved()) {
      const disabled = !this.getSelectedLands().length || this.props.isLoading
      return (
        <ChainButton chainId={ChainId.KAI_MAINNET} disabled={disabled} primary onClick={this.handleClaim}>
          Claim Now
        </ChainButton>
      )
    }
    const disabled = this.props.isLoading
    return (
      <ChainButton chainId={ChainId.KAI_MAINNET} disabled={disabled} primary onClick={this.handleGrantToken}>
        Approve
      </ChainButton>
    )
  }

  renderSale = () => {
    if (!this.isLive()) return
    const selectedCount = this.getSelectedLands().length
    const displayBalance = ethers.utils.formatUnits(this.props.price, 18)
    const totalAmount = this.props.price.mul(BigNumber.from(selectedCount))
    const displayTotalAmount = ethers.utils.formatUnits(totalAmount, 18)
    return (
      <div>
        <div className="summary">{this.renderSelectedLands()}</div>
        <div className="price">
          <b>Price</b>: {displayBalance} BEAN
        </div>
        <div className="total_price">
          <b>Total Price</b>: {displayTotalAmount} BEAN
        </div>
        <div className="claim-btn">{this.props.isConnected ? this.renderClaimBtn() : <ConnectButton primary />}</div>
      </div>
    )
  }

  renderCountdown() {
    if (this.isEnd()) return
    return (
      <div className="time">
        <LandCountdown
          onComplete={this.handleCountdownComplete}
          startTime={this.state.auctionStartTime}
          endTime={this.state.auctionEndTime}
        />
      </div>
    )
  }

  render() {
    return (
      <>
        <Page isFullscreen className="LandSale">
          <Atlas onClick={this.handleClick} tiles={this.props.tiles} layers={[this.selectedStrokeLayer, this.selectedFillLayer]} />
        </Page>
        <Container textAlign="center" className="landsale-form">
          <div className="land_sale_title">{this.renderTitle()}</div>
          {this.renderCountdown()}
          {this.renderSale()}
        </Container>
        <Footer />
      </>
    )
  }
}
