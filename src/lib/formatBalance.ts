import { BigNumber} from 'ethers'
import { commify, formatEther } from 'ethers/lib/utils'

export const BIG_TEN = BigNumber.from(10)


/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
 export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
    return amount.div(BIG_TEN.pow(decimals))
  }
  
  export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
    return amount.div(BIG_TEN.pow(decimals))
  }
  
  /**
   * This function is not really necessary but is used throughout the site.
   */
  export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
    return getBalanceAmount(balance, decimals).toNumber()
  }

  export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
    return commify(formatEther(getBalanceAmount(balance, decimals)))
  }