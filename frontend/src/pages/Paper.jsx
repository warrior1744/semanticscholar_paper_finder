import { useContext, useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import Spinner from '../components/layout/Spinner'
import { getPaperDetail } from '../context/semanticscholar/SemanticsholarActions'
import {authorsToString} from '../util/converter'

function Paper() {

  const { paper, dispatch, papers, bucketItems, loading} = useContext(SemanticscholarContext)

  const params = useParams()
  const id = params.paperId

  const {paperId, title, authors, publicationDate, fieldsOfStudy, journal, abstract, citations, references} = paper

  useEffect(() => {
      if(!paper || (id !== paper.paperId)){
        const getPaper = async (id) => {
          const paperDetail = await getPaperDetail(id)
          dispatch({type: 'GET_PAPER', payload: paperDetail})
        }
        getPaper(id)

       dispatch({type:'SET_LOADING'})
      }
      
  }, [dispatch, params.paperId, paper])

    if(loading){
      return <Spinner/>
    }else{
      return <>         
            <div>
              <h1></h1>
              <div className="flex justify-between">
                <Link 
                  to='/' 
                  className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                  >回上頁
                </Link>
                <div className="form-control">
                  <label className="cursor-pointer label">
                  <span className='label-text text-base mr-2'>清單</span>
                  <input type="checkbox" 
                        name={paperId}
                        id={paperId}
                        className="checkbox checkbox-primary checkbox-lg"
                        value={paperId}
                        // checked= {isChecked}
                        // onChange={(e) => {
                        //   handleAddOnChange(index, e)
                        //   setIsChecked(!isChecked)
                        // }}
                  />
                  </label>
                </div>
                </div>
              </div>

            { (paper && Object.keys(paper).length !==0) && (
              <div>
              <h3 className='mb-2 text-2xl font-bold'>{title}</h3>
              <div className='font-thin mb-3 italic'>
                  <p>{authorsToString(authors)}</p>
              </div>
              <div className='flex flex-row flex-nowrap text-sm font-bold mb-3'>
                  <p>Published {publicationDate},</p>
                  <p>{fieldsOfStudy.toString()}</p>
                  <p>{journal.name}</p>
              </div>
              <p>{abstract}</p>
              </div>
            )}
            
          </>
    }
}

export default Paper