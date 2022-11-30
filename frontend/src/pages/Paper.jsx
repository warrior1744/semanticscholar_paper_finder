import { useContext, useEffect, useState } from 'react'
import { useParams, Link, useLocation} from 'react-router-dom'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import BucketContext from '../context/bucket/bucketContext'
import { getPaperDetail } from '../context/semanticscholar/SemanticsholarActions'
import { addPaper, removePaper } from '../context/bucket/bucketActions'
import Spinner from '../components/layout/Spinner'
import UserContext from '../context/user/UserContext'

function Paper() {

  const { paper, dispatch, papers, loading} = useContext(SemanticscholarContext)
  const {bucketItems, bucketDispatch} = useContext(BucketContext)
  const {userLogin} = useContext(UserContext)

  //code copied from PaperItem (use on the checkbox)
  const [isChecked, setIsChecked] = useState(false)
  const { data } = papers
  const { userInfo} = userLogin

  const params = useParams()
  const { index } = useLocation().state
  const id = params.paperId

  const {paperId, title, authors, publicationDate, fieldsOfStudy, journal, abstract, citations, references} = paper

  useEffect(() => {
      if(!paper || (id !== paper.paperId)){
        const getPaper = async (id) => {
          await getPaperDetail(id, dispatch)
        }
        getPaper(id)
      }

      const checkedItem = bucketItems.find( paper => paper.paperId === paperId)

      if(checkedItem){
          setIsChecked(true)
      }
      
  }, [dispatch, params.paperId, paper, isChecked])

  const handleAddOnChange = async (position, e) => {
    const paperItem = data[position]

    if(data[position].paperId === e.target.value){
      const paperExists = bucketItems.find(item => item.paperId === e.target.value)

      if(e.target.checked){
        if(!paperExists){
           await addPaper(paperItem, bucketDispatch, userInfo)
        }
      }else{
        if(paperExists){
            const id = paperExists._id
            await removePaper(id, bucketDispatch, userInfo)
            setIsChecked(false)
        }else{
            console.log(`_id not found`)
        }
      }
    }
  }

    if(loading){
      return <Spinner/>
    }else{
      return <>         
            <div>
              {/* <h1>{index}</h1> */}
              <div className="flex justify-between">
                <Link 
                  to='/' 
                  className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                  >回上頁
                </Link>
                {userInfo &&
                  <div className="form-control">
                    <label className="cursor-pointer label">
                    <span className='label-text text-base mr-2'>清單</span>
                    <input type="checkbox" 
                          name={paperId}
                          id={paperId}
                          className="checkbox checkbox-primary checkbox-lg"
                          value={paperId}
                          checked= {isChecked}
                          onChange={(e) => {
                            handleAddOnChange(index, e)
                            setIsChecked(!isChecked)
                          }}
                    />
                    </label>
                  </div>
                }
                </div>
              </div>

            { (paper && Object.keys(paper).length !==0) && (
              <div>
              {title &&
                <h3 className='mb-2 text-2xl font-bold'>{title}</h3>
              }
              {authors &&
                <div className='font-thin mb-3 italic'>
                  <p>{authors.reduce((str, obj, index) => str+(index>0?', ': "")+obj.name,'')}</p>
                </div>
              }

              <div className='flex flex-row flex-nowrap text-sm font-bold mb-3'>
                  {publicationDate &&
                    <p>Published {publicationDate},</p>
                  }
                  {fieldsOfStudy && 
                    <p>{fieldsOfStudy.toString()}</p>
                  }
                  {journal &&
                    (journal.name && 
                      <p>{journal.name}</p>
                    )
                  }
              </div>
                {abstract && 
                  <p>{abstract}</p>
                }
              </div>
            )}
          </>
    }
}

export default Paper