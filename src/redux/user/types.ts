export const LOGIN_ACTION = 'LOGIN_ACTION'
export const SPLASH_ACTION = 'SPLASH_ACTION'
export const LOG_OUT_ACTION = 'LOG_OUT_ACTION'

interface LoginAction {
  type: typeof LOGIN_ACTION
  payload: any
}

export type SplashAction = {
  type: typeof SPLASH_ACTION
  payload: any
}

export type LogoutAction = {
  type: typeof LOG_OUT_ACTION
  payload: any
}

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction
export type AuthenActionTypes = LoginAction | SplashAction | LogoutAction
