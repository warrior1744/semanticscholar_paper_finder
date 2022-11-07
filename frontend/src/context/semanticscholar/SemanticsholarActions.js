import axios from 'axios'

const SEMANTIC_URL = process.env.REACT_APP_SEMANTIC_URL
const SEMANTIC_KEY = process.env.REACT_APP_SEMANTIC_KEY

const semanticscholar = axios.create({
    baseURL: SEMANTIC_URL,
    headers: {'x-api-key':SEMANTIC_KEY}
})
//https://api.semanticscholar.org/graph/v1/paper/search

export const searchPapers = async (text, FOSFilter ='', yearRange, sort, offset= 0, limit=100, dispatch) => {

    try{
        dispatch({type:'SET_LOADING'})
        const encodedText = encodeURI(text)

        // const params = new URLSearchParams({query: text})

        const { data } = await semanticscholar.get(`/paper/search?query=${encodedText}&offset=${offset}&limit=${limit}&fields=title,authors,venue,publicationDate,publicationTypes,year,journal,s2FieldsOfStudy,fieldsOfStudy,abstract,url&fieldsOfStudy=${FOSFilter}&year=${yearRange}&sort=${sort}`)
    
        //save the searching params and parameters to the object
        data['query'] = text
        data['offset'] = offset
        data['limit'] = limit
        data['FOSFilter'] = FOSFilter
        data['yearRange'] = yearRange
        data['sort'] = sort
        dispatch({type:'GET_PAPERS', payload: data})
    }catch (error){
        dispatch({
            type:'FAIL_LOADING',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message})
    }
}

export const getPaperDetail = async (id, dispatch) => {

    try{
        dispatch({type:'SET_LOADING'})
        const {data} = await semanticscholar.get(`/paper/${id}?fields=title,authors,venue,publicationDate,publicationTypes,year,journal,fieldsOfStudy,s2FieldsOfStudy,abstract,url,year,citations,references`)
        dispatch({type: 'GET_PAPER', payload: data})
    }catch (error){
        dispatch({
            type:'FAIL_LOADING',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message})
    }
}




