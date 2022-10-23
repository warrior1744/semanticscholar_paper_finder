import {useContext, useEffect, useState} from 'react'
import Spinner from '../layout/Spinner'
import PaperItem from './PaperItem'
import SemanticscholarContext from '../../context/semanticscholar/SemanticsholarContext'
import { searchPapers } from '../../context/semanticscholar/SemanticsholarActions'

function PaperResults() {

  const { papers, loading, dispatch} = useContext(SemanticscholarContext)
  const { data, offset, next, FOSFilter, query, sort, yearRange, itemIndex, limit} = papers

  // fetch the next page of data
  const handleNextPage = async (e) => {
    const nextOffset = offset + (next - offset)
    const nextItemIndex = itemIndex + (next - offset)
    // console.log(`nextOffset -> ${nextOffset}, nextItemIndex -> ${nextItemIndex}`)
    const papers = await searchPapers(query, FOSFilter, yearRange, sort, nextOffset, limit, nextItemIndex)
    dispatch({type:'GET_PAPERS', payload: papers})

  }

  // fetch the previous page of data
  const handlePreviousPage = async (e) => {
    const previousOffset = offset - (next - offset)
    const previousItemIndex = itemIndex - (next - offset)

    // console.log(`previousOffset -> ${previousOffset}, previousItemIndex -> ${previousItemIndex}`)
    const papers = await searchPapers(query, FOSFilter, yearRange, sort, 
    previousOffset, limit, previousItemIndex)
    dispatch({type:'GET_PAPERS', payload: papers})
  }

  if(!loading){
    return (
      <div>
      <div className='grid grid-cols-1 divide-y-2 divide-current'>
        {data.map((paper, index) => (
          <PaperItem key={paper.paperId}
                     paper={paper}
                     index={index}
                     itemIndex={index+itemIndex}
                    //  handleAddOnChange={handleAddOnChange}
                     />
        ))}
      </div>
      <div className='flex justify-between'>
        {
          (offset !== undefined && offset !== 0) ? (
            <button 
              className='btn'
              onClick={(e) => {handlePreviousPage(e)}}
              >上一頁
            </button> 
            ) : (
            <button 
              className='btn invisible'
              >上一頁
            </button>
          )
        }
        {
          (next && (next >= (limit+offset))) ? (
            <button 
              className='btn'
              onClick={(e) => {handleNextPage(e)}}
              >下一頁
            </button>
            ) : (
            <button 
              className='btn invisible'
              >下一頁
            </button>
          )
        }
      </div>
    </div>
    )
  } else {
    return <Spinner />
  }
}

export default PaperResults