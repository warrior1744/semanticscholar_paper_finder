import {useContext, useEffect} from 'react'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import BucketContext from '../context/bucket/bucketContext'
import writeXlsxFile from 'write-excel-file'
import { Link } from 'react-router-dom'
import { getAllPapers, removeAllPapers, removePaper } from '../context/bucket/bucketActions'
import UserContext from '../context/user/UserContext'


function Bucket() {

    const {dispatch} = useContext(SemanticscholarContext)
    const {userLogin} = useContext(UserContext)
    const {bucketItems, bucketDispatch} = useContext(BucketContext)

    const {userInfo} = userLogin

    // get bucket items from the database
    useEffect(() => {
        if(userInfo){
            const getPapers = async () => {
                await getAllPapers(bucketDispatch, userInfo, userInfo)
            }
            getPapers()
        }
    },[dispatch, bucketDispatch, userInfo])

    const removeAllPapersHandler = async () => {
        if(bucketItems.length > 0){
            await removeAllPapers(bucketDispatch, userInfo, userInfo)
        }
    }

    const handleDelete = async (id) => {
        if(id){
            await removePaper(id, bucketDispatch, userInfo)
        }
        console.log(`paper ${id} has been deleted`)
    }

    const exportExcel = async () => {
        let item = {title:'', authors:'', journalName:'', journalVolume:'', publicationDate:'', journalPages:'',  search:'', abstractCHT: '', abstract:'',
        url:''}
    
        let contentArray = []
    
        const HEADER_ROW = [
            { value:"篇名"},
            { value:"作者"},
            { value:"刊名"},
            { value:"卷期"},
            { value:"出版年月"},
            { value:"頁次"},
            { value:"關鍵詞"},
            { value:"中文摘要"},
            { value:"英文摘要"},
            { value:"資源連結"},
        ]

        contentArray.push(HEADER_ROW)

        bucketItems.forEach((paper, index) => {
            item['title'] = paper.title
            item['authors'] = paper.authors.reduce((str, obj, index) => str+(index>0?", ":"")+obj.name,'')
            item['journalName'] = paper.journal.name 
            item['journalVolume'] = paper.journal.volume
            item['journalPages'] = paper.journal.pages
            item['publicationDate'] = paper.publicationDate
            item['search'] = ''   //reserved
            item['abstractCHT'] = ''
            item['abstract'] = paper.abstract
            item['url'] = paper.url
            const DATA_ROW = [] //push to data row
            for( let property in item){
                const obj = {value: item[property], fontWeight: 'bold' }
                DATA_ROW.push(obj)
            }
              contentArray.push(DATA_ROW)
        })
    
        await writeXlsxFile(contentArray, {
            fileName: 'semanticscholar.xlsx'
        })
    }//close exportExcel

    return (
    <>
        {bucketItems.length > 0 ? 
            (<div>
                <div className='flex gap-6'>
                    <button 
                        onClick={exportExcel} 
                        className="btn btn-primary btn-lg">
                            Convert To Excel
                    </button>
                    <label
                        htmlFor={`deleteAllPapers`}
                        className="btn btn-primary btn-lg modal-button">
                            Remove All Items
                    </label>
                    <input 
                            type="checkbox" 
                            id={`deleteAllPapers`}
                            className="modal-toggle" 
                    />
                    <label htmlFor={`deleteAllPapers`} className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Are you sure to remove all the items?</h3>
                            <div className='flex flex-fow justify-around'>
                                <div className="modal-action">
                                    <label 
                                        htmlFor={`deleteAllPapers`} 
                                        className="btn" 
                                        onClick={removeAllPapersHandler}
                                    >Confirm</label>
                                </div> 
                                <div className="modal-action">
                                    <label htmlFor={`deleteAllPapers`} className="btn">Cancel</label>
                                </div> 
                            </div>
                        </label>
                    </label> 
                    <Link 
                        to='/' 
                        className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                        >Go Back
                    </Link>
                </div>        
                {
                    bucketItems.map((paper, index) => (
                    <div key={paper._id}>
                      <div className='flex flex-row'>
                        <div className='mb-4 mr-2 flex flex-row'>
                            <div> 
                                <div className='border-solid border-2
                                border-sky-500 px-2 mr-3 font-bold rounded-full'>
                                    {index+1}
                                </div>
                            </div>
                            <div>
                                {paper.title}  
                                <label 
                                    htmlFor={`content${paper._id}`}  
                                    className="badge badge-primary modal-button m-2 cursor-pointer">
                                    View
                                </label>
                                <label 
                                    htmlFor={`deletion${paper._id}`}  
                                    className="badge badge-warning modal-button m-2 cursor-pointer">
                                    Delete
                                </label>
                            </div>
                        </div>
                        <input 
                            type="checkbox" 
                            id={`content${paper._id}`}  className="modal-toggle" 
                        />
                        <label htmlFor={`content${paper._id}`}
                               className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <label 
                                    htmlFor={`content${paper._id}`}
                                    className="btn btn-sm btn-circle absolute right-2 top-2">
                                        X
                                </label>
                                <ul>
                                    {paper.title &&(
                                        <li>
                                            <span className='border-solid    border-2 border-sky-500 px-2 mr-3 font-bold rounded-full'>
                                            {index+1}
                                            </span>                               
                                            <div>
                                                Title：{paper.title}
                                            </div>
                                        </li>
                                    )}  _.pluck(names3, 'name').join(', ')
                                    {paper.authors && (
                                        <li>Author：{paper.authors.reduce((str, obj, index) => str+(index>0?", ":"")+obj.name,'')}</li>
                                    )}
            
                                    {paper.journal &&
                                    (paper.journal.name && 
                                        <li key={paper.journal.name}>Journal：{paper.journal.name}</li>
                                    )
                                    }
                                    {paper.journal &&
                                    (paper.journal.volume && 
                                        <li key={paper.journal.volume}>Volume：{paper.journal.volume}</li>
                                    )
                                    }
                                    {paper.journal &&
                                    (paper.journal.pages && 
                                        <li key={paper.journal.pages}>Page：{paper.journal.pages}</li>
                                    )
                                    }                            
                                    {paper.publicationDate && (
                                        <li>Publication：{paper.publicationDate}</li>
                                    )}
                                    {paper.search && (
                                        <li>Search：{paper.search}</li>
                                    )}
                                    
                                    {paper.abstractCHT && (
                                        <li>Abstract Chinese：{paper.abstractCHT}</li>
                                    )}
                                    
                                    {paper.abstract && (
                                        <li>Abstract：{paper.abstract}</li>
                                    )}
                                    {paper.url &&(
                                        <li>
                                        <a href={paper.url}
                                            className="m-2 badge badge-primary"
                                            target='_blank'
                                            rel='noreferer'
                                            >Go to the official page
                                        </a>
                                        </li>
                                    )}
                                    <br />
                                </ul>
                            </label>
                        </label>

                        <input 
                            type="checkbox" 
                            id={`deletion${paper._id}`}  className="modal-toggle" 
                        />
                        <label htmlFor={`deletion${paper._id}`} className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <h3 className="text-lg font-bold">Are you sure to remove No {`${index+1}`} item?</h3>
                                <div className='flex flex-fow justify-around'>
                                    <div className="modal-action">
                                        <label 
                                            htmlFor={`deletion${paper._id}`} 
                                            className="btn" 
                                            onClick={() =>{handleDelete(paper._id)}}
                                        >Confirm</label>
                                    </div> 
                                    <div className="modal-action">
                                        <label htmlFor={`deletion${paper._id}`} className="btn">Cancel</label>
                                    </div> 
                                </div>
                            </label>
                        </label>                        
                      </div>
                    </div>
                    ))
                }
            </div> ) : (
                <div>
                    <div className='alert alert-info shadow-lg mb-3'>
                        <h2>! No item in the inventory</h2>
                    </div>
                    <Link 
                        to='/' 
                        className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                        >Go Back
                    </Link> 
                </div>)  
        } 
    </>
    ) 
}

export default Bucket