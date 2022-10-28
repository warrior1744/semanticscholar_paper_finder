import {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import SemanticscholarContext from '../../context/semanticscholar/SemanticsholarContext'
import BucketContext from '../../context/bucket/bucketContext'
import {removeDupObjValues} from '../../util/converter'
import { addPaper, removePaper } from '../../context/bucket/bucketActions'

function PaperItem(
    {
      paper,
      index,
      itemIndex, //appears as numbers next to each paper on the screen
    }) 
{

  const {papers, dispatch} = useContext(SemanticscholarContext)  
  const {bucketItems, bucketDispatch} = useContext(BucketContext)

  const [category, setCategory] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  

  const { paperId, title, authors, year, url, s2FieldsOfStudy, abstract, journal, publicationDate, pages} = paper
  
  const { data } = papers

  const handleAddOnChange = async (position, e) => {
    const paperItem = data[position]

    if(data[position].paperId === e.target.value){
      const paperExists = bucketItems.find(item => item.paperId === e.target.value)

      if(e.target.checked){
        if(!paperExists){
           await addPaper(paperItem, bucketDispatch)
        }
      }else{
        if(paperExists){
            const id = paperExists._id
            await removePaper(id, bucketDispatch)
            setIsChecked(false)
        }else{
            console.log(`_id not found`)
        }
      }
    }
  }


  useEffect(() => {
    const category = removeDupObjValues(s2FieldsOfStudy, 'category')
    setCategory(category)

    const checkedItem = bucketItems.find( paper => paper.paperId === paperId)

    if(checkedItem){
        setIsChecked(true)
    }
  },[dispatch, bucketDispatch])


  return (
        <div>
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className='label-text text-base'>
                        {itemIndex+1}. {title}
                    </span>
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
            <div className='mb-2' >
                <div className='flex gap-6 mb-4'>
                    <div>
                        <label 
                            htmlFor={`attr${paperId}`}  
                            className="badge badge-primary modal-button cursor-pointer">
                                屬性
                        </label>
                        <input 
                            type="checkbox" 
                            id={`attr${paperId}`}  className="modal-toggle" 
                        />
                        <label htmlFor={`attr${paperId}`}
                               className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <label 
                                    htmlFor={`attr${paperId}`}
                                    className="btn btn-sm btn-circle absolute right-2 top-2">
                                        X
                                </label>
                                    <ul>
                                    {publicationDate && (
                                        <li key={publicationDate}>出版年月: {publicationDate}</li> 
                                     )}
    
                                    {journal && 
                                         (journal.name && 
                                            <li key={journal.name}>刊名： {journal.name}
                                         </li>
                                         )
                                         } 
                                    {journal &&
                                         (journal.volume && 
                                            <li key={journal.volume}>卷期： {journal.volume}
                                         </li>
                                         )
                                    } 
                                    {journal &&
                                         (journal.pages && 
                                            <li key={journal.pages}>頁次： {journal.pages}
                                         </li>
                                         )
                                    }     
                                    </ul>
    
                            </label>
                        </label>
                    </div>
    
                    <div>
                        <label 
                            htmlFor={`category${paperId}`}  
                            className="badge badge-primary modal-button cursor-pointer">
                                分類
                        </label>
                        <input 
                            type="checkbox" 
                            id={`category${paperId}`}  className="modal-toggle" 
                        />
                        <label htmlFor={`category${paperId}`}
                               className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <label 
                                    htmlFor={`category${paperId}`}
                                    className="btn btn-sm btn-circle absolute right-2 top-2">
                                        X
                                </label>
                                <ul>
                                    {category.length > 0 ? (
                                         category.map((fos) => (
                                    <li key={fos}>{fos}</li>
                                ))
                                ): (<p>無分類</p>)}
                                </ul>
                            </label>
                        </label>
                    </div>
    
                    <div>
                        <label 
                            htmlFor={`authors${paperId}`}  
                            className="badge badge-primary modal-button cursor-pointer">
                                作者
                        </label>
                        <input 
                            type="checkbox" 
                            id={`authors${paperId}`}  className="modal-toggle" 
                        />
                        <label htmlFor={`authors${paperId}`}
                               className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <label 
                                    htmlFor={`authors${paperId}`}
                                    className="btn btn-sm btn-circle absolute right-2 top-2">
                                        X
                                </label>
                                <ul>
                                    {authors.length > 0 ? (
                                        authors.map((author, index) => (
                                            <li key={index}>{author.name}</li>
                                        ))
                                    ): ( <p>找無作者</p>)} 
                                </ul>
                            </label>
                        </label>
                    </div>
                    
                    <div>
                        <Link 
                            className='text-base-content text-opacity-40' 
                            to={`/paper/${paperId}`}
                            state={{ index: index}}
                            >
                            <span className='badge badge-lg'> 全部資料 
                            </span> 
                        </Link>
                    </div>
                </div>
    
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"> 
                        <div className="collapse-title text-base">
                            顯示摘要
                        </div>
                        <div className="collapse-content"> 
                            <p>{abstract}</p>
                        </div>
                    </div>
            </div>   
        </div>
      )  
}

PaperItem.propTypes = {
    paper: PropTypes.object.isRequired
}

export default PaperItem