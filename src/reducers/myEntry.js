const myEntryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [...state, action.myEntry]
        case 'SET_ENTRIES':
            return action.entries
        case 'DELETE_ENTRY':
            return {}
        case 'UPDATE_ENTRY':
            return state.map((entry) => {
                if (entry._id === action.id) {
                    return {
                        ...entry,
                        ...action.updates
                    }
                } else {
                    return entry
                }
            })
        default:
            return state
    }
}
export default myEntryReducer