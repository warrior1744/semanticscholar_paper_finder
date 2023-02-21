
import { useState, useContext, useEffect, useCallback } from 'react'
import SemanticscholarContext from '../../context/semanticscholar/SemanticsholarContext'
import { searchPapers } from '../../context/semanticscholar/SemanticsholarActions'
import AlertContext from '../../context/alert/AlertContext'
import { setSearchAlert } from '../../context/alert/AlertActions'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
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

  const [searchText, setSearchText] = useState('')
  const [FOSCheckedState, setFOSCheckedState] = useState(
    new Array(fieldsOfStudy.length).fill(false)
  )  //initial state = [false, false, false, false, ...]
  const [sort, setSort] = useState('relevance')
  const [FOSFilter, setFOSFilter] = useState('')
  const [dateRange, setDateRange] = useState(lastTenYears+'-'+year)
  const [limit, setLimit] = useState(100)

  const {papers, dispatch, loading} = useContext(SemanticscholarContext)
  const {dispatchAlert} = useContext(AlertContext)
  const { data } = papers

  useEffect(() => {
    const relevance = document.getElementById('relevance')
    relevance.checked = true
    if(searchText !== ''){
      searchPapers(searchText, FOSFilter, dateRange, sort,0 , limit, dispatch)
    }
  },[sort, FOSFilter, dateRange, limit])

  const handleDateRangeOnChange = (event, newDateRange) => {
    setDateRange(`${newDateRange[0]}-${newDateRange[1]}`)
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

  const handleSearchChange = useCallback((e) => setSearchText(e.target.value), [])

  const handleLimitOnChange = async (e) => {
    setLimit(Number(e.target.value))
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if(searchText === ''){
      setSearchAlert('Please enter something', 'error', dispatchAlert)
    }else{
      dispatch({type:'SET_SEARCH', payload: searchText})  
      await searchPapers(searchText, FOSFilter, dateRange, sort, 0, limit, dispatch)
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
            }} className="btn btn-lg"> Clear 
          </button>
        </div>
        )}
        <div>
          <form onSubmit={handleSearchSubmit}>
            <div className="form-control">
              <div className="relative">
                <input 
                      type="text" 
                      className="input-primary w-full pr-40 bg-gray-200 input input-lg text-black input-bordered"
                      placeholder='Search Papers'
                      value={searchText}
                      onChange={handleSearchChange}
                />
                <button 
                      type='text'
                      className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                      >
                        Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div> 

      <div className='flex'>
        <div className='dropdown w-4/5'> 
          <label tabIndex={0} className="btn m-1">Filter</label>
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
            <label tabIndex={0} className="btn m-1">Years</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Box sx={{width: 200}}>
                <Slider
                  min={1951}
                  max={year}
                  getAriaLabel={() => 'Date Range'}
                  value={[Number(dateRange.split('-')[0]), Number(dateRange.split('-')[1])]}
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
            <label tabIndex={0} className="btn m-1">Relations</label>
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
                          disabled
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
            <label tabIndex={0} className="btn m-1">Display Limits</label>
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