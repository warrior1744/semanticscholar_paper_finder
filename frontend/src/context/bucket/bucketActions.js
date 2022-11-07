import axios from 'axios'

//save paper to the bucket in DB

export const addPaper = async (paper, dispatch, userInfo) => {
    try{
        dispatch({type: 'SET_LOADING'})
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/bucket`, paper, config)

        dispatch({
            type:'ADD_PAPER_TO_BUCKET_SUCCESS', payload: data
        })
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch({       
            type: 'ADD_PAPER_TO_BUCKET_FAIL',
            payload: message})
    }
}

//delete a paper from the bucket in DB

export const removePaper = async (id, dispatch, userInfo) => {
    try {
        dispatch({type: 'SET_LOADING'})

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/bucket/${id}`, config)

        dispatch({
            type: 'REMOVE_PAPER_FROM_BUCKET_SUCCESS',
            payload: data
        })
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch({       
            type: 'REMOVE_PAPER_FROM_BUCKET_FAIL',
            payload: message})
    }
}

//get papers from the bucket in DB

export const getAllPapers = async (dispatch, userInfo) => {
    try{
        dispatch({type: 'SET_LOADING'})

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const  {data}  = await axios.get(`/api/bucket`, config)

        dispatch({
            type: 'GET_ALL_BUCKET_PAPERS_SUCCESS',
            payload: data
        })
    }catch (error) {
        dispatch({
            type:'GET_ALL_BUCKET_PAPERS_FAIL',
            payload:
            error.response && error.response.data.message
                ? error.response.data.message 
                : error.message})
    }
}

//delete all papers from the bucket in DB

export const removeAllPapers = async (dispatch, userInfo) => {
    try{
        dispatch({type: 'SET_LOADING'})

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/bucket`, config)

        dispatch({
            type: 'REMOVE_ALL_BUCKET_PAPERS_SUCCESS'
        })
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch({       
            type: 'REMOVE_ALL_BUCKET_PAPERS_FAIL',
            payload: message})
    }
}





