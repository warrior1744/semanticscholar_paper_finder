
export const semanticscholarReducer = (state , action) => {
     switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'FAIL_LOADING' :
            return {
                loading: false, error: action.payload
            }                
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'CLEAR_SEARCH':
            return {
                ...state,
                search: ""
            }
        case 'GET_PAPERS':
            return {
                ...state,
                papers: action.payload,
                loading: false,
            }
        case 'CLEAR_PAPERS':
            return {
                ...state,
                papers:{data:[]}
            }
        case 'GET_PAPER':
            return {
                ...state,
                paper: action.payload,
                loading: false,
            }
        case 'CLEAR_PAPER':
            return {
                ...state,
                paper: {},
            }
        default:
            return state
     }
}