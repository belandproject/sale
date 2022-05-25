import React from 'react'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'

type Props = {
  value: BigNumber
  max: BigNumber
}

const ProgressBar = ({ value, max }: Props) => {
  const progress = Math.floor(value.toNumber() / max.toNumber()  * 100);
  const Parentdiv: any = {
    height: 30,
    width: '100%',
    backgroundColor: 'whitesmoke',
    lineHeight: '30px',
    borderRadius: 20
  }

  const Childdiv: any = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: 'var(--oj-not-simpson)',
    borderRadius: 40,
    textAlign: 'right'
  }

  const progresstext: any = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
  }

  return (
    <div>
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
        <div style={{...progresstext, color: 'var(--text)'}}>
            <Balance decimals={0} value={value.toNumber()} prefix={""}/>/
            <Balance decimals={0} value={max.toNumber()} subfix={""}/> KAI
        </div>
    </div>
  )
}

export default ProgressBar
