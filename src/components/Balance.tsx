import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'

type BalanceProps = {
  value: number
  decimals: number
  prefix: string
}

const Balance: React.FC<BalanceProps> = ({ value, decimals, prefix }) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])
  return <CountUp start={previousValue.current} end={value} decimals={decimals} prefix={prefix} />
}

export default Balance
