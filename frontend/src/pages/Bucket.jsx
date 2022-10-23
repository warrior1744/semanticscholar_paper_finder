import {useContext} from 'react'
import SemanticscholarContext from '../context/semanticscholar/SemanticsholarContext'
import writeXlsxFile from 'write-excel-file'
import {authorsToString} from '../util/converter'
import { Link } from 'react-router-dom'

function Bucket() {

    const {bucketItems, dispatch} = useContext(SemanticscholarContext)

    const exportExcel = async () => {
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
            let item = {}
            item['title'] = paper.title
            item['authors'] = authorsToString(paper.authors)
            item['journalName'] = paper.journal.name
            item['journalVolume'] = paper.journal.volume
            item['publicationDate'] = paper.publicationDate
            item['journalPages'] = paper.journal.pages
            item['search'] = ''   //reserved
            item['abstract(cth)'] = ''
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
                    <>
                        <ul key={paper}>
                            <li>篇名：{paper.title}</li>
                            <li>作者：{
                                authorsToString(paper.authors)
                                }</li>
                            <li>刊名：{paper.journal.name}</li>
                            <li>卷期：{paper.journal.volume}</li>
                            <li>出版年月：{paper.publicationDate}</li>
                            <li>頁次：{paper.journal.pages}</li>
                            <li>關鍵詞：</li>
                            <li>中文摘要：</li>
                            <li>英文摘要：{paper.abstract === null ? (<p>nothing</p>) : paper.abstract.length > 100 ? (paper.abstract.substring(0,100)+'...') : (paper.abstract)}</li>
                            <li>資源連結：{paper.url}</li>
                            <br />
                        </ul>
                    </>
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