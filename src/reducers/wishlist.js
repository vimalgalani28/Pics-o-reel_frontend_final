const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IN_WISHLIST":
      return [...state, action.entry];
    case "DELETE_IN_WISHLIST":
      return state.filter(({ _id }) => _id !== action._id);
    default:
      return state;
  }
};
export default wishlistReducer;
