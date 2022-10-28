import { createContext, useReducer } from 'react'
import { bucketReducer } from '../bucket/bucketReducer'

const BucketContext = createContext()

export const BucketProvider = ({children}) => {

    const BucketinitialState = {
        bucketItems:[],
        bucketLoading:false
    }

    const [bucketState, bucketDispatch] = useReducer(bucketReducer, BucketinitialState)

    return  <BucketContext.Provider value={{...bucketState, bucketDispatch}}>
                {children}
            </BucketContext.Provider>
}

export default BucketContext