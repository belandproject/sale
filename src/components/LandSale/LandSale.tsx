import * as React from 'react'
import { Atlas, Button, Container, Layer, Page } from '@beland/uikit'

import Footer from 'components/Footer'
import { Props, State } from './LandSale.types'
import './LandSale.css'
import LandCountdown from './components/LandCountdown/LandCountdown'

export default class LandSale extends React.PureComponent<Props> {
  state: State = {
    selected: [],
    auctionEndTime: Date.now() + 10000,
    auctionStartTime: Date.now() + 5000,
    countdownCompleted: 0
  }
  componentDidMount(): void {
    this.props.fetchTiles()
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
    return this.state.selected.includes(key)
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
    const { selected } = this.state
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

  renderSale = () => {
    if (!this.isLive()) return

    return (
      <div>
        <div className="summary">{this.renderSelectedLands()}</div>
        <div className="price">
          <b>Price</b>: 1000 BEAN
        </div>
        <div className="total_price">
          <b>Total Price</b>: 1000 BEAN
        </div>
        <div className="claim-btn">
          <Button primary>Claim Now</Button>
        </div>
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
