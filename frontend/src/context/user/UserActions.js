import axios from 'axios'

export const login = async (email, password, dispatch) => {

    try{
        dispatch({
            type:'USER_LOGIN_REQUEST',
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post(`/api/users/login`, { email, password}, config)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (error){
        console.log('login Error', error)
        dispatch({ type:'USER_LOGIN_FAIL',
                   payload:
                   error.response && error.response.data.message
                   ? error.response.data.message
                   : error.message,
                })
    }
}

export const logout = (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: 'USER_LOGOUT'})
    document.location.href = '/login'
}

export const registerAction = async (firstname, lastname, email, password, dispatch) => {
    try{
        dispatch({
            type: 'USER_REGISTER_REQUEST',
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post('/api/users', {firstname, lastname, email, password}, config)

        dispatch({
            type:'USER_REGISTER_SUCCESS',
            payload: data
        })
    }catch(error){
        console.log('registerAction Error', error)
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
}

export const getUserDetails = async (id, dispatch, userInfo) => {
    try {
        dispatch({
            type: 'USER_DETAILS_REQUEST',
        })

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`,config)

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        })
    }catch(error){
        console.log('getUserDetails Error', error)
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

export const updateUserProfile = async (user, dispatch, userInfo) => {
    try {
        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST',
        })

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: data
        })
        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        })
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        if (message === 'Not authorized, token failed') {
            dispatch({type: 'USER_LOGOUT'})
          }
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload: message,
        })
    }
}

export const listUsers = async (dispatch, userInfo) => {
    try{
        dispatch({
            type: 'USER_LIST_REQUEST',
        })

        const config = { headers: { Authorization: `Bearer ${userInfo.token}`}}
        const { data } = await axios.get(`/api/users`, config)

        dispatch({
            type: 'USER_LIST_SUCCESS',
            payload: data,
        })
    }catch (error) {
        console.log('listUsers Error', error)
        dispatch({
            type: 'USER_LIST_FAIL',
            payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
        })
    }
}

export const deleteUser = async (id, dispatch, userInfo) => {
    try{
        dispatch({ type: 'USER_DELETE_REQUEST', })
        const config = { headers: { Authorization: `Bearer ${userInfo.token}`}}
        await axios.delete(`/api/users/${id}`, config)

        dispatch({ type: 'USER_DELETE_SUCCESS', })
    }catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL',
            payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
        })
    }
}

export const updateUser = async (user, dispatch, userInfo) => {
    try{
        dispatch({
            type: 'USER_UPDATE_REQUEST',
        })
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`}
        }
        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({ type: 'USER_UPDATE_SUCCESS' })

        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data })
    }catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


