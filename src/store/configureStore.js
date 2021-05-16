import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/user";
import myEntryReducer from "../reducers/myEntry";
import wishlistReducer from "../reducers/wishlist";
import allEntriesReducer from "../reducers/allEntry";
<<<<<<< HEAD
import voteListReducer from "../reducers/voteList";
=======
import leaderboardEntriesReducer from "../reducers/leaderboard";
>>>>>>> 78aae205e93007efe53e00a4faf4a35489161a73

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      myEntry: myEntryReducer,
      wishlist: wishlistReducer,
<<<<<<< HEAD
      voteList: voteListReducer,
      allEntries: allEntriesReducer,
=======
      allEntries: allEntriesReducer,
      leaderboardEntries: leaderboardEntriesReducer
>>>>>>> 78aae205e93007efe53e00a4faf4a35489161a73
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
export default configureStore;
