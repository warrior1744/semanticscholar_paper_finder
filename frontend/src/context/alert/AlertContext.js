import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({children}) => {

    const initialState = null

    const [state, dispatchAlert] = useReducer(alertReducer, initialState)



    return <AlertContext.Provider value={{
        alert: state,
        dispatchAlert,
    }}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext