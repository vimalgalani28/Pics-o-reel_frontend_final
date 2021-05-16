const leaderboardEntriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEADERBOARD_ENTRIES':
            return action.entries
        case 'DELETE_LEADERBOARD_ENTRIES':
            return []
        default:
            return state
    }
}
export default leaderboardEntriesReducer