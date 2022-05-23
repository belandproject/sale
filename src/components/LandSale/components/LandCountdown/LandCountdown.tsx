import React from 'react'
import { Props } from './LandCountdown.types'
import Countdown from 'react-countdown'
import './LandCountdown.css'

export default class LandCountdown extends React.PureComponent<Props> {

  countdownRenderer = ({ hours, minutes, seconds, days }: any) => {
    return (
      <ul className='land-countdown'>
        <li><span>{days}</span> Days</li>
        <li><span>{hours}</span> Hours</li>
        <li><span>{minutes}</span> Mins</li>
        <li><span>{seconds}</span> Secs</li>
      </ul>
    )
  }

  getCountdownTime = () => {
    const { startTime, endTime } = this.props;
    const now = Date.now()
    if (startTime < now) {
      return now + (now - startTime)
    } else if (endTime < now) {
      return now + (endTime - now)
    }
    return 0
  }

  renderCountdown = () => {
      const countdownTime= this.getCountdownTime()
      if (countdownTime > 0) {
        return <Countdown daysInHours={true} date={countdownTime} renderer={this.countdownRenderer} />
      }
      return null
  } 

  render() {
    return this.renderCountdown()
  }
}
