import { CallHistoryMethodAction } from 'connected-react-router'
import { Dispatch } from 'react'

export type Props = {
  code: string
}

export type MapStateProps = Pick<Props, 'code'>
export type MapDispatchProps = {}

export type MapDispatch = Dispatch<CallHistoryMethodAction>
