import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { UserMenuProps } from '@beland/uikit'
import { LogoutAction } from 'modules/identity/actions'

export type Props = Partial<UserMenuProps>

export type MapStateProps = Pick<Props, 'isSignedIn' | 'isSigningIn'>
export type MapDispatchProps = Pick<Props, 'onSignOut'>
export type MapDispatch = Dispatch<CallHistoryMethodAction | LogoutAction>
