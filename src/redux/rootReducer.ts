import { userReducer, UserState } from './user';
import { combineReducers } from "redux";


export interface ReduxState {
    user: UserState,
}

export const RootReducer = combineReducers<ReduxState>({
    user: userReducer,
})
