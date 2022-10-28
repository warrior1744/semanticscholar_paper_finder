
import { useState, useContext, useEffect } from 'react'
import SemanticscholarContext from '../../context/semanticscholar/SemanticsholarContext'
import { searchPapers } from '../../context/semanticscholar/SemanticsholarActions'
import { getAllPapers } from '../../context/bucket/bucketActions'
import AlertContext from '../../context/alert/AlertContext'
import { setSearchAlert } from '../../context/alert/AlertActions'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import BucketContext from '../../context/bucket/bucketContext'

function PaperSearch() {

  const fieldsOfStudy = [
    {name:'Computer Science'},
    {name: 'Medicine'}, 
    {name: 'Chemistry'},
    {name: 'Biology'},
    {name: 'Materials Science'},
    {name: 'Physics'},
    {name: 'Geology'},
    {name: 'Psychology'},
    {name: 'Art'},
    {name: 'History'},
    {name: 'Geography'},
    {name: 'Sociology'},
    {name: 'Business'},
    {name: 'Political Science'},
    {name: 'Economics'},
    {name: 'Philosophy'},
    {name: 'Mathematics'},
    {name: 'Engineering'},
    {name: 'Environmental Science'},
    {name: 'Agricultural and Food Sciences'},
    {name: 'Education'},
    {name: 'Law'},
    {name: 'Linguistics'},
  ]
  
  const sortArray = [
    'relevance','total-citations','influence','pub-date'
  ]
  
  const date = new Date()
  const year = date.getFullYear()
  const lastTenYears = year - 10

  const [text, setText] = useState('')
  const [FOSCheckedState, setFOSCheckedState] = useState(
    new Array(fieldsOfStudy.length).fill(false)
  )  //initial state = [false, false, false, false, ...]
  const [sort, setSort] = useState('relevance')
  const [FOSFilter, setFOSFilter] = useState('')
  const [dateRange, setDateRange] = useState([lastTenYears, year])
  const [limit, setLimit] = useState(100)

  const {papers, dispatch, loading} = useContext(SemanticscholarContext)
  const {dispatchAlert} = useContext(AlertContext)
  const {bucketDispatch} = useContext(BucketContext)
  const { data } = papers


  useEffect(() => {
    const relevance = document.getElementById('relevance')
    relevance.checked = true

    const getPapers = async () => {
      await getAllPapers(bucketDispatch)
  }
  getPapers()
  },[])

  const handleDateRangeOnChange = (event, newDateRange) => {
    setDateRange(newDateRange)
  }

  const handleFOSOnChange = (position) => {
    const updatedFOSCheckedState = FOSCheckedState.map((item, index) => index === position ? !item: item)
    setFOSCheckedState(updatedFOSCheckedState)
    const FOSArray = []
    updatedFOSCheckedState.map((item, index) =>
      {
        if(item === true){
          FOSArray.push(fieldsOfStudy[index].name)
        }
      }
    )
    setFOSFilter(FOSArray.toString())
  }

  const handleSortOnChange = (e, position) => {
    setSort(e.target.value)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleLimitOnChange = (e) => {
    setLimit(Number(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(text === ''){
      setSearchAlert('Please enter something', 'error', dispatchAlert)
    }else{
      dispatch({type:'SET_SEARCH', payload: text})
      
      let yearRange = ''

      if(dateRange[0] === dateRange[1]){
        yearRange = dateRange[0]
      }else{
        yearRange = dateRange[0]+'-'+dateRange[1]
      }
      
      await searchPapers(text, FOSFilter, yearRange, sort, 0, limit, dispatch)
    }
  }

  return (
    <div className='mb-20'>
      <div className='grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 mb-8 gap-8'>
        {data.length > 0 && (
        <div>
          <button onClick={() => {
            dispatch({type: 'CLEAR_PAPERS'})
            dispatch({type: 'CLEAR_SEARCH'})
            }} className="btn btn-lg"> 清除結果 
          </button>
        </div>
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="relative">
                <input 
                      type="text" 
                      className="input-primary w-full pr-40 bg-gray-200 input input-lg text-black input-bordered"
                      placeholder='Search Papers'
                      value={text}
                      onChange={handleChange}
                />
                <button 
                      type='text'
                      className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                      >
                        尋  找
                </button>
              </div>
            </div>
          </form>
        </div>
      </div> 

      <div className='flex'>
        <div className='dropdown w-4/5'> 
          <label tabIndex={0} className="btn m-1">篩  選</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full list-none grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2
          ">
            {fieldsOfStudy.map(({name}, index) => {
              return (
                  <li key={index} className="flex flex-row flex-nowrap">
                    <input
                      type="checkbox"
                      id={`fieldsOfStudy-${index}`}
                      name={name}
                      value={name}
                      checked= {FOSCheckedState[index]}
                      onChange={() => handleFOSOnChange(index)}
                    />
                    <label htmlFor={`fieldsOfStudy-${index}`}>{name}</label>
                  </li>
                )
            }
            )}
          </ul>
        </div>
        <div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">年  限</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Box sx={{width: 200}}>
                <Slider
                  min={1951}
                  max={year}
                  getAriaLabel={() => 'Date Range'}
                  value={dateRange}
                  onChange={handleDateRangeOnChange}
                  valueLabelDisplay='auto'
                />
                </Box>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">關  聯</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {sortArray.map((type, index) =>{
                return (
                  <li key={type} className='flex flex-row flex-nowrap'>
                    <input 
                          id={type}
                          type="radio"
                          name='sort' 
                          value={type} 
                          className="radio"
                          onChange={(e) => handleSortOnChange(e, index)}
                    />
                    {type}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div>
          <div className='dropdown'>
            <label tabIndex={0} className="btn m-1">筆  數</label>
              <select tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w52 select w-full max-w-xs"
                value={limit} onChange={(e) => handleLimitOnChange(e)}>
                <option value="100">100</option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="10">10</option>
              </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperSearch