import {useContext, useState, useEffect} from 'react'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import writeXlsxFile from 'write-excel-file'
import {authorsToString} from '../util/converter'
import { Link } from 'react-router-dom'

function Bucket() {

    const {bucketItems, dispatch} = useContext(SemanticscholarContext)

    const exportExcel = async () => {
        let item = {title:'', authors:'', journalName:'', journalVolume:'', journalPages:'', publicationDate:'', search:'', abstractCHT: '', abstract:'',
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
            if(paper.title !== null){
                item['title'] = paper.title
            }
    
            if(paper.authors !== null){
                item['authors'] = authorsToString(paper.authors)
            }
            if(paper.journal !== null){
                if(paper.journal.name !== null){
                    item['journalName'] = paper.journal.name 
                }
                if(paper.journal.volume !== null){
                    item['journalVolume'] = paper.journal.volume
                }
                if(paper.journal.pages !== null){
                    item['journalPages'] = paper.journal.pages
                }
            }
    
            if(paper.publicationDate !== null){
                item['publicationDate'] = paper.publicationDate
            }
    
            item['search'] = ''   //reserved
            item['abstractCHT'] = ''
            if(paper.abstract !== null){
                item['abstract'] = paper.abstract
            }
            if(paper.url !== null){
                item['url'] = paper.url
            }
           
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
                <div className='flex gap-8'>
                    <button 
                        onClick={exportExcel} 
                        className="btn btn-primary btn-lg">
                            轉 Excel
                    </button>
                    <button 
                        onClick={() => { dispatch({type:'BUCKET_EMPTY_ITEM'})}}     className="btn btn-primary btn-lg">
                            清除所有項目
                    </button>
                    <Link 
                        to='/' 
                        className='btn btn-ghost btn-outline btn-lg rounded-btn mb-3'
                        >回上頁
                    </Link>
                </div>        
                {

                    bucketItems.map((paper, index) => (
                    <div key={paper.paperId}>
                        <ul>
                            {paper.title &&(
                                <li>篇名：{paper.title}</li>
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
                            
                            {paper.publicationDate &&(
                                <li>出版年月：{paper.publicationDate}</li>
                            )}
                            <li>關鍵詞：</li>
                            <li>中文摘要：</li>
                            <li>英文摘要：{paper.abstract === null ? (<p>nothing</p>) : paper.abstract.length > 100 ? (paper.abstract.substring(0,100)+'...') : (paper.abstract)}</li>

                            {paper.url &&(
                                <li>資源連結：{paper.url}</li>
                            )}
                            <br />
                        </ul>
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