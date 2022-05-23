import * as React from 'react'
import { Atlas, Layer } from '@beland/uikit'

import Footer from 'components/Footer'
import { Props, State } from './LandSale.types'
import './LandSale.css'

export default class LandSale extends React.PureComponent<Props> {
  state: State = {
    selected: {}
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
      selected[key] = true
    } else {
      delete selected[key]
    }
    this.setState({ selected })
  }

  isSelected = (x: number, y: number): boolean => {
    const key = `${x},${y}`
    return this.state.selected[key]
  }

  selectedStrokeLayer: Layer = (x, y) => {
    return this.isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
  }

  selectedFillLayer: Layer = (x, y) => {
    return this.isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
  }

  render() {
    return (
      <>
        <Atlas onClick={this.handleClick} tiles={this.props.tiles} layers={[this.selectedStrokeLayer, this.selectedFillLayer]} />
        <Footer />
      </>
    )
  }
}
