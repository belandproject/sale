import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import BigNumber from 'bignumber.js'
import { contributeTokenRequest, ContributeTokenRequestAction, fetchTokenSaleInfoRequest, FetchTokenSaleInfoRequestAction } from 'modules/tokenSale/actions'

export type DefaultProps = {
    rate: BigNumber
    raised: BigNumber
    isLoading: boolean
    fetchTokenSaleInfo: typeof fetchTokenSaleInfoRequest
    contribute: typeof contributeTokenRequest
    address: string | undefined
    isConnected: boolean
}

export type Props = DefaultProps & {}

export type MapStateProps = Pick<Props, 'isLoading' | 'rate' | 'raised' | 'isConnected' | 'address'>
export type MapDispatchProps = Pick<Props, 'fetchTokenSaleInfo'| 'contribute'>

export type State = {
    countdownStep: number
    contributeAmount: string
}

export type MapDispatch = Dispatch<
  CallHistoryMethodAction | FetchTokenSaleInfoRequestAction | ContributeTokenRequestAction
>