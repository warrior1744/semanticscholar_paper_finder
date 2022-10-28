export const setSearchAlert = (msg, type, dispatch) => {
    dispatch({
        type:'SET_SEARCH_ALERT',
        payload: {msg, type},
    })

    setTimeout(() => dispatch({type: 'REMOVE_SEARCH_ALERT'}), 3000)
}




