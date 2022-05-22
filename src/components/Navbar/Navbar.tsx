import * as React from 'react'
import { Navbar as BaseNavbar } from '@beland/dapps/dist/containers'
import { Props } from './Navbar.types'
import './Navbar.css'
export default class Navbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className='be-nav-container'>
        <BaseNavbar isFullscreen {...this.props}/>
      </div>
    ) 
  }
}