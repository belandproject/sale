import { ButtonProps } from '@beland/uikit'
import { Dispatch } from 'redux'

export type Props = ButtonProps & {
  onSignIn: () => void
}
export type MapStateProps = {}
export type MapDispatchProps = Props
export type MapDispatch = Dispatch
export type OwnProps = Partial<Props>