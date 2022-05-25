import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'

type BalanceProps = {
  value: number
  decimals: number
  prefix?: string
  subfix?: string
}

const Balance: React.FC<BalanceProps> = ({ value, decimals, prefix = '', subfix = '' }) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])
  return <CountUp separator="," start={previousValue.current} end={value} decimals={decimals} prefix={prefix} suffix={subfix} />
}

export default Balance
