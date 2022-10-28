import { useContext } from 'react'
import {FaBookReader} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BucketContext from '../../context/bucket/bucketContext'

function Navbar({title}) {

  const {bucketItems} = useContext(BucketContext)

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
                    <div className="indicator">
                        <div className="span indicator-item badge badge-secondary">{bucketItems.length}</div>
                        <Link to='/bucket' className='btn btn-ghost btn-sm rounded-btn text-xl'>清單
                        </Link>
                    </div>
                    <Link to='/about' className='btn btn-ghost btn-sm rounded-btn text-xl'>關於
                    </Link>
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

// <div className="indicator">
//   <span className="indicator-item badge badge-secondary">99+</span> 
//   <button className="btn">inbox</button>
// </div>

export default Navbar