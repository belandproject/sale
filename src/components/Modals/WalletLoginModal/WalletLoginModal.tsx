import * as React from 'react'
import { ProviderType } from '@beland/schemas'
import LoginModal from '@beland/dapps/dist/containers/LoginModal'
import { Props } from './WalletLoginModal.types'

export default class WalletLoginModal extends React.PureComponent<Props> {
  handleClose = () => {
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  handleConnect = (providerType: ProviderType) => {
    this.props.onConnect(providerType)
  }

  render() {
    return <LoginModal open={true} onConnect={this.handleConnect} onClose={this.handleClose} />
  }
}
