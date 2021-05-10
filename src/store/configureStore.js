import { createStore, combineReducers } from "redux"
import userReducer from "../reducers/user"
import myEntryReducer from "../reducers/myEntry"
const configureStore = () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            myEntry: myEntryReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}
export default configureStore