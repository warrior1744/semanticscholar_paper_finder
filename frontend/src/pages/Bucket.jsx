import {useContext, useState, useEffect} from 'react'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import BucketContext from '../context/bucket/bucketContext'
import writeXlsxFile from 'write-excel-file'
import {authorsToString} from '../util/converter'
import { Link } from 'react-router-dom'
import { getAllPapers, removeAllPapers, removePaper } from '../context/bucket/bucketActions'



function Bucket() {

    const {dispatch} = useContext(SemanticscholarContext)
    const {bucketItems, bucketDispatch} = useContext(BucketContext)


    // get bucket items from the database
    useEffect(() => {
        const getPapers = async () => {
            await getAllPapers(bucketDispatch)
        }
        getPapers()
    },[dispatch, bucketDispatch])

    const removeAllPapersHandler = async () => {
        if(bucketItems.length > 0){
            await removeAllPapers(bucketDispatch)
        }
    }

    const handleDelete = async (id) => {
        if(id){
            await removePaper(id, bucketDispatch)
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
            item['authors'] = authorsToString(paper.authors)
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
                            轉 Excel
                    </button>
                    <label
                        htmlFor={`deleteAllPapers`}
                        className="btn btn-primary btn-lg modal-button">
                            刪除所有項目
                    </label>
                    <input 
                            type="checkbox" 
                            id={`deleteAllPapers`}
                            className="modal-toggle" 
                    />
                    <label htmlFor={`deleteAllPapers`} className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">您確定要刪除全部項目?</h3>
                            <div className='flex flex-fow justify-around'>
                                <div className="modal-action">
                                    <label 
                                        htmlFor={`deleteAllPapers`} 
                                        className="btn" 
                                        onClick={removeAllPapersHandler}
                                    >確定</label>
                                </div> 
                                <div className="modal-action">
                                    <label htmlFor={`deleteAllPapers`} className="btn">取消</label>
                                </div> 
                            </div>
                        </label>
                    </label> 
                    <Link 
                        to='/' 
                        className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                        >回上頁
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
                                    檢視
                                </label>
                                <label 
                                    htmlFor={`deletion${paper._id}`}  
                                    className="badge badge-warning modal-button m-2 cursor-pointer">
                                    刪除
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
                                                篇名：{paper.title}
                                            </div>
                                        </li>
                                    )}
                                    {paper.authors && (
                                        <li>作者：{authorsToString(paper.authors)}</li>
                                    )}
            
                                    {paper.journal &&
                                    (paper.journal.name && 
                                        <li key={paper.journal.name}>刊名：{paper.journal.name}</li>
                                    )
                                    }
                                    {paper.journal &&
                                    (paper.journal.volume && 
                                        <li key={paper.journal.volume}>卷期：{paper.journal.volume}</li>
                                    )
                                    }
                                    {paper.journal &&
                                    (paper.journal.pages && 
                                        <li key={paper.journal.pages}>頁次：{paper.journal.pages}</li>
                                    )
                                    }                            
                                    {paper.publicationDate && (
                                        <li>出版年月：{paper.publicationDate}</li>
                                    )}
                                    {paper.search && (
                                        <li>關鍵詞：{paper.search}</li>
                                    )}
                                    
                                    {paper.abstractCHT && (
                                        <li>中文摘要：{paper.abstractCHT}</li>
                                    )}
                                    
                                    {paper.abstract && (
                                        <li>英文摘要：{paper.abstract}</li>
                                    )}
                                    {paper.url &&(
                                        <li>
                                        <a href={paper.url}
                                            className="m-2 badge badge-primary"
                                            target='_blank'
                                            rel='noreferer'
                                            >擊此開啟官方資料
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
                                <h3 className="text-lg font-bold">您確定要刪除清單第 {`${index+1}`} 項目?</h3>
                                <div className='flex flex-fow justify-around'>
                                    <div className="modal-action">
                                        <label 
                                            htmlFor={`deletion${paper._id}`} 
                                            className="btn" 
                                            onClick={() =>{handleDelete(paper._id)}}
                                        >確定</label>
                                    </div> 
                                    <div className="modal-action">
                                        <label htmlFor={`deletion${paper._id}`} className="btn">取消</label>
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
                        <h2>! 清單沒有項目</h2>
                    </div>
                    <Link 
                        to='/' 
                        className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                        >回上頁
                    </Link> 
                </div>)  
        } 
    </>
    ) 
}

export default Bucket