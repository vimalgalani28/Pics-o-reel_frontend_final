// ADD_ENTRY action generator
export const addMyEntry = (myEntry) => ({
    type: "ADD_ENTRY",
    myEntry
})

export const setMyEntries = (entries) => ({
    type: "SET_ENTRIES",
    entries
})

export const updateMyEntry = (updatedEntry) => ({
    type: "UPDATE_ENTRY",
    updatedEntry
})

export const deleteMyEntry = () => ({
    type: "DELETE_ENTRY"
})