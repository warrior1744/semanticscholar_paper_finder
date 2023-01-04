import React, {useEffect, useContext} from 'react' 
import { Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import {login} from '../context/user/UserActions'
import {useForm} from 'react-hook-form'

function Login() {

  const navigate = useNavigate()

  const queryRedirect = useLocation().search
  const redirect = queryRedirect? queryRedirect.split('=')[1]:''

  const {userLogin} = useContext(UserContext)  
  const {userInfo, loginError} = userLogin
  
  useEffect(() => {
    if(userInfo){
      navigate('/'+redirect)
    }
  }, [navigate, userInfo, redirect])

  return (
    <>
    <div className="container px-6">
      <h1 className='block text-4xl mb-6 text-center'>登入</h1>
      <div className='mt-6 text-center'>
            還沒有帳號嗎 ? <Link to={redirect? `/register?redirect=${redirect}`: '/register'}>
            註冊
          </Link>
      </div>
      <div>
        <LoginInputs redirect={redirect} loginError={loginError}/>
      </div>
    </div>
    </>
  )
}

const LoginInputs = ({redirect, loginError}) => {

  const { register, handleSubmit, watch, formState: {errors}} = useForm()

  const {userDispatch} = useContext(UserContext)  

  const onSubmit = async (data) => {
    await login(data.email, data.password, userDispatch)
  }

  return (
    <>
      <div className='mt-6 gap-3 mb-4 flex flex-col justify-center items-center'>
        <div className='w-2/5 text-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'> &nbsp;&nbsp; E-mail &nbsp;</span>
                <input {...register('email', {
                      pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      required: true})}
                      type="text" 
                      defaultValue="john@example.com"
                      className="input input-bordered w-full" />
              </label>
              {errors.email && <span>E-mail格式無效</span>}
            </div>
            
            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>Password</span>
                <input {...register('password', {
                      validate: value => value.length > 0,
                      required: true})}
                      type="password" 
                      className="input input-bordered w-full" />
              </label>
              {errors.password && <span>請輸入密碼</span>}
            </div>
            {loginError && <h1>{loginError}</h1>}
            <button type='submit' className='btn btn-large mt-6'>送出</button>
          </form>  
        </div>   
    </div>

  </>)
}


export default Login