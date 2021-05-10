const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.user
        case 'SET_PHOTOGRAPHY_VOTE':
            return {
                ...state,
                hasVotedPhotography: action.hasVotedPhotography
            }
        case 'SET_PAINTING_VOTE':
            return {
                ...state,
                hasVotedPainting: action.hasVotedPainting
            }
        case 'LOGOUT_USER':
            return {}
        default:
            return state
    }
}
export default userReducer