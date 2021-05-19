export const addInVote = (entry) => ({
  type: "ADD_IN_VOTELIST",
  entry,
});

export const deleteInVote = (_id) => ({
  type: "DELETE_IN_VOTELIST",
  _id,
});
