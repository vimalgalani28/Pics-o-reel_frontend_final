const voteListReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IN_VOTELIST":
      return [...state, action.entry];
    case "DELETE_IN_VOTELIST":
      return state.filter(({ _id }) => _id !== action._id);

    default:
      return state;
  }
};
export default voteListReducer;
