import { createContext, useReducer } from 'react'
import { userReducer } from './UserReducer'

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const userLoginFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null

    const UserInitialState = {
        userLogin:{userInfo:userLoginFromStorage},
        userRegister:{},
        user:{},
        updateProfile:{},
        userList:{},
        userDelete:{},
        userUpdate:{},
    }

    const [userState, userDispatch] = useReducer(userReducer, UserInitialState)

    return <UserContext.Provider value={{...userState, userDispatch}}>
                {children}
           </UserContext.Provider>
}


export default UserContext