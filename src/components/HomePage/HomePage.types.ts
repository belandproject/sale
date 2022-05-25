import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'

export type DefaultProps = {
    
}

export type Props = DefaultProps & {}

export type MapStateProps = Props
export type MapDispatchProps = Props
export type MapDispatch = Dispatch<CallHistoryMethodAction>

export type State = {
    countdownStep: number
}