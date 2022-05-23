import * as React from 'react'
import { Button} from '@beland/uikit'

import { Props } from './ConnectButton.types'
import './ConnectButton.css'

export default class ConnectButton extends React.PureComponent<Props> {
  render() {
    return (
    <Button onClick={this.props.onSignIn} {...this.props}>
       Connect Wallet
      </Button>
    )
  }
}
