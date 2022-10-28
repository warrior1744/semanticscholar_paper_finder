const alertReducer = (state, action) => {
    switch(action.type){
        case 'SET_SEARCH_ALERT':
            return action.payload
        case 'REMOVE_SEARCH_ALERT':
            return null
        default:
            return state
    }
}

export default alertReducer