import { createContext, useReducer } from 'react'
import {semanticscholarReducer} from './SemanticsholarReducer'
import {authorsToString} from '../../util/converter'

const SemanticscholarContext = createContext()

export const SemanticscholarProvider = ({children}) => {

    




    const initialState = {
        search:"",
        papers:{data:[]},
        paper:{},
        bucketItems:[],
        loading:false
    }

    const [state, dispatch] = useReducer(semanticscholarReducer, initialState)

    return <SemanticscholarContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </SemanticscholarContext.Provider>

}

export default SemanticscholarContext