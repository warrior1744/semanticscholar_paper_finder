
export const semanticscholarReducer = (state , action) => {
     switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
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
        case 'BUCKET_ADD_ITEM':
            const paperItem = action.payload
            const existPaperItem = state.bucketItems.find((item) => item.paperId === paperItem.paperId)
            if(existPaperItem){
                return {
                    ...state,
                    bucketItems: state.bucketItems.map((item) => item.paperId === existPaperItem.paperId ? paperItem: item)
                }
            }else{ //Merge Array
                return {
                    ...state,
                    bucketItems: [...state.bucketItems, paperItem]
                }
            }
        case 'BUCKET_REMOVE_ITEM':
            return {
                ...state,
                bucketItems: state.bucketItems.filter(item => item.paperId !== action.payload.paperId) //payload is paper object
            }
        case 'BUCKET_EMPTY_ITEM':
            return {
                ...state,
                bucketItems: []
            }                    
        default:
            return state
     }
}