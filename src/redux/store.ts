import { Store, createStore, applyMiddleware } from "redux";
import { RootReducer, ReduxState } from "./rootReducer";
import thunk from 'redux-thunk'

const configureStore = (): Store<ReduxState> => {


    const middleware = applyMiddleware(thunk)

    const store = createStore(RootReducer, middleware)
    return store
}
export const store = configureStore()