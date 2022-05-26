import { Container, Page } from '@beland/uikit'
import React, { useState } from 'react'
import { Props } from './ReferralPage.types'
import CopyToClipboard from 'react-copy-to-clipboard'
import './ReferralPage.css'
import Footer from 'components/Footer'

const ReferralPage: React.FC<Props> = ({ code }) => {
  const [copied, setCopy] = useState(false)
  const refLink = 'http://ref.beland.io/' + code
  const renderLink = () => {
    if (code) {
      return (
        <>
          <CopyToClipboard text={refLink} onCopy={() => setCopy(true)}>
            <div className="copy">
              <span>{refLink} </span>
              {copied ? <span style={{ color: 'red' }}>(Copied)</span> : <span>(Copy)</span>}
            </div>
          </CopyToClipboard>
        </>
      )
    }
    return null
  }

  return (
    <>
      <Page isFullscreen className="ReferralPage">
        <Container textAlign="center">
          <div className="ref">
            <h2>Invite my friends</h2>
            <div className="reffer-link">
              Copy & send the address to all of your friends and get reward on every transactions
              {renderLink()}
            </div>
          </div>
        </Container>
      </Page>
      <Footer />
    </>
  )
}

export default ReferralPage
