import { useContext, useEffect } from 'react'
import {FaBookReader} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BucketContext from '../../context/bucket/bucketContext'
import UserContext from '../../context/user/UserContext'
import { getAllPapers } from '../../context/bucket/bucketActions'
import {logout} from '../../context/user/UserActions'

// import { useCountdown} from '../../customHooks/useCountdown'

function Navbar({title}) {

  const {userLogin, userDispatch} = useContext(UserContext)  
  const {bucketItems, bucketDispatch} = useContext(BucketContext)
//   const [days, hours, minutes, seconds] = useCountdown('2022,11,30')

  const {userInfo} = userLogin

  useEffect(() => {
    if(userInfo){
        const getPapers = async () => {
          await getAllPapers(bucketDispatch, userInfo)
      }
      getPapers()
    }
  },[userInfo])

  const logoutHandler = () => {
    logout(userDispatch)
  }

  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content fixed top-0 left-0 right-0 z-10">
        <div className="container flex flex-col sm:flex-row mx-auto">
            <div className="flex-none px-2 mx-2">
                <FaBookReader className="inline pr-2 text-3xl"/>
                <Link to='/' className='text-2xl font-bold align-middle '>{title}</Link>
            </div>

            <div className="flex-1 px-2">
                <div className="flex justify-end gap-4">
                    <Link to='/' className='btn btn-ghost btn-sm rounded-btn text-xl'>首頁
                    </Link>

                    {userInfo? (
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-sm rounded-btn text-xl">嗨  {userInfo.firstname}</label>
                            <ul tabIndex={0}
                                className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-52">
                                <li>  
                                    <Link to='/bucket' className='text-lg text-black btn btn-ghost'>清單
                                        <div className="badge badge-secondary">{bucketItems && (bucketItems.length)}</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/profile' className='text-lg text-black btn btn-ghost'>個人檔案
                                    </Link>
                                </li>
                                <li>
                                    <button 
                                        className='text-lg text-black btn btn-ghost'
                                        onClick={logoutHandler}
                                        >登出
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to='/login' className='btn btn-ghost btn-sm rounded-btn text-xl'>登入
                        </Link>
                    )}

                    <Link to='/about' className='btn btn-ghost btn-sm rounded-btn text-xl'>關於
                    </Link>
                    {/* <p>{days} Days {hours}:{minutes}:{seconds}</p> */}
                </div>
            </div>
        </div>
    </nav>
  )
}

Navbar.defaultProps = {
    title: 'Semanticscholar Paper Finder'
}

Navbar.propTypes = {
    title: PropTypes.string,
}

export default Navbar