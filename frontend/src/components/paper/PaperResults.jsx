import {useContext} from 'react'
import Spinner from '../layout/Spinner'
import PaperItem from './PaperItem'
import SemanticscholarContext from '../../context/semanticscholar/SemanticsholarContext'
import { searchPapers } from '../../context/semanticscholar/SemanticsholarActions'

function PaperResults() {

  const { papers, loading, dispatch} = useContext(SemanticscholarContext)
  const { data, offset, next, FOSFilter, query, sort, yearRange, limit} = papers

  // fetch the next page of data
  const handleNextPage = async (e) => {
    const nextOffset = offset + (next - offset)
    await searchPapers(query, FOSFilter, yearRange, sort, nextOffset, limit, dispatch)
  }

  // fetch the previous page of data
  const handlePreviousPage = async (e) => {
    const previousOffset = offset - (next - offset + (limit - (next-offset)))
    await searchPapers(query, FOSFilter, yearRange, sort, 
    previousOffset, limit, dispatch)
  }

  //useMemo -> migrate the await getAllPapers from PaperSearch Component in useEffect to useMemo here
  //and then use on JSX render

  if(!loading){
    return (
      <div className='relative'>
      <div className='grid grid-cols-1 divide-y-2 divide-current'>
        {data.map((paper, index) => (
          <PaperItem key={paper.paperId}
                     paper={paper}
                     index={index}
                     itemIndex={index+offset}
                     />
        ))}
      </div>
      <div className='flex justify-between'>
        {
          (offset !== undefined && offset !== 0) ? (
            <button 
              className='btn'
              onClick={(e) => {handlePreviousPage(e)}}
              >Previous Page
            </button> 
            ) : (
            <button 
              className='btn invisible'
              >Previous Page
            </button>
          )
        }
        {
          (next && (next >= (limit+offset))) ? (
            <button 
              className='btn'
              onClick={(e) => {handleNextPage(e)}}
              >Next Page
            </button>
            ) : (
            <button 
              className='btn invisible'
              >Next Page
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