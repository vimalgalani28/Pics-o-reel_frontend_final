import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/user";
import myEntryReducer from "../reducers/myEntry";
import wishlistReducer from "../reducers/wishlist";
import allEntriesReducer from "../reducers/allEntry";
import voteListReducer from "../reducers/voteList";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      myEntry: myEntryReducer,
      wishlist: wishlistReducer,
      voteList: voteListReducer,
      allEntries: allEntriesReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
export default configureStore;
