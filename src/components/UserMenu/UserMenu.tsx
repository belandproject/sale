import React from 'react'
import { UserMenu as BaseUserMenu } from '@beland/dapps/dist/containers'
import { Props } from './UserMenu.types'

export default class UserMenu extends React.PureComponent<Props> {
  render() {
    return (
      <>
        <BaseUserMenu {...this.props} />
      </>
    )
  }
}
