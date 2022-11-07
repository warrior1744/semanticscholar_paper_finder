export const bucketReducer = (state, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'ADD_PAPER_TO_BUCKET_SUCCESS':
            const paperItem = action.payload
            const existPaperItem = state.bucketItems.find((item) => item.paperId === paperItem.paperId)
            if(existPaperItem){
                return {
                    ...state,
                    bucketItems: state.bucketItems.map((item) => item.paperId === existPaperItem.paperId ? paperItem: item),
                    bucketLoading: false,
                }
            }else{ //Merge Array
                return {
                    ...state,
                    bucketItems: [...state.bucketItems, paperItem],
                    bucketLoading: false,
                    
                }
            }
        case 'REMOVE_PAPER_FROM_BUCKET_SUCCESS':
            return {
                ...state,
                bucketItems: state.bucketItems.filter(item => item.paperId !== action.payload.paperId),
                bucketLoading: false,
                success: true,
                message: action.payload.message,
            } 
        case 'GET_ALL_BUCKET_PAPERS_SUCCESS':
            return {
                ...state,
                bucketItems: action.payload,
                bucketLoading: false,
            }
        case 'REMOVE_ALL_BUCKET_PAPERS_SUCCESS':
            return {
                ...state,
                bucketLoading: false,
                success: true,
                bucketItems:[]
            }
        default:
            return {
                state
            }
    }
}