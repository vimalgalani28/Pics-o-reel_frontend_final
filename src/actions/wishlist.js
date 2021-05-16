export const addInWishlist = (entry) => ({
  type: "ADD_IN_WISHLIST",
  entry,
});

export const removeExpense = (_id) => ({
  type: "DELETE_IN_WISHLIST",
  _id,
});
