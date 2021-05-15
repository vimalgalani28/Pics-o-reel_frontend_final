const allEntriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_All_ENTRIES':
            return action.entries
        case 'DELETE_All_ENTRIES':
            return []
        default:
            return state
    }
}
export default allEntriesReducer