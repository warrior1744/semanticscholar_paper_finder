import { createContext, useReducer } from 'react'
import {semanticscholarReducer} from './SemanticsholarReducer'

const SemanticscholarContext = createContext()

export const SemanticscholarProvider = ({children}) => {

    const SemanticscholarinitialState = {
        search:"",
        papers:{data:[]},
        paper:{},
        loading:false
    }


    const [state, dispatch] = useReducer(semanticscholarReducer, SemanticscholarinitialState)


    return <SemanticscholarContext.Provider value={{...state, dispatch}}>
                {children}
           </SemanticscholarContext.Provider>
}

export default SemanticscholarContext