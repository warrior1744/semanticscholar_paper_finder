import React, {useEffect, useContext, useRef} from 'react' 
import {Link,useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import {login, registerAction} from '../context/user/UserActions'
import {useForm} from 'react-hook-form'

function Register() {

  const navigate = useNavigate()

  const queryRedirect = useLocation().search
  const redirect = queryRedirect? queryRedirect.split('=')[1]:''

  const {userLogin } = useContext(UserContext)  
  const {userInfo, loginError, loginLoading } = userLogin

 
  useEffect(() => {
    if(userInfo){
      navigate('/'+redirect)
    }
  }, [navigate, userInfo, redirect])

  return (
    <>
      <div className="container px-6">
      <h1 className='block text-4xl mb-6 text-center'>註冊</h1>
        {loginError && <h1>{loginError}</h1>}
        <div className='mt-6 text-center'>
            已有帳號了嗎 ? <Link to={`/login`}>
            登入
          </Link>
        </div> 
        <div>
          <RegisterInputs redirect={redirect}/>
        </div>
      </div>
    </>
  )
}

const RegisterInputs = ({redirect}) => {

  const { register, handleSubmit, watch, formState: {errors}} = useForm()
  
  const {userDispatch, userRegister} = useContext(UserContext)  
  const {registerLoading, registerSuccess} = userRegister


  const onSubmit = async (data) => {

    await registerAction(data.firstname, data.lastname, data.email, data.password, userDispatch)

    if(registerSuccess){
      await login(data.email, data.password, userDispatch)
    }
  }

  return (
    <>
      <div className="mt-6 gap-6 mb-4 flex flex-col justify-center items-center">
        <div className='w-2/5 text-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>First Name</span>
                <input {...register('firstname', {
                      required: true,
                      pattern:/^[a-zA-Z]+$/})}
                      type="text"
                      className="input input-bordered w-full " />
              </label>
              {errors.firstname && <span>只接受英文字母</span>}
            </div>

            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>Last Name</span>
                <input {...register('lastname', {
                        required: true,
                        pattern:/^[a-zA-Z]+$/})}
                        type="text"
                        className="input input-bordered w-full" />
              </label>
              {errors.lastname && <span>只接受英文字母</span>}
            </div>

            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>E-mail</span>
                <input {...register('email', {
                        pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        required: true})}
                        type="text"
                        className="input input-bordered w-full" />
              </label>
              {errors.email && <span>E-mail格式無效</span>}
            </div>

            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>Password</span>
                <input {...register('password', {
                        pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                        required: true})}
                        type="password"
                        className="input input-bordered w-full" />
              </label>
              {errors.password && <span>密碼需至少8碼, 且需包涵大寫、小寫和數字</span>}
            </div>

            <div className="mb-4">
              <label className="input-group">
                <span className='w-2/5'>Confirm Password</span>
                <input {...register('confirmPassword', {
                        validate: value => value === watch('password'),
                        required: true})}
                        type="password"
                        className="input input-bordered w-full" />
              </label>
              {errors.confirmPassword && <span>確認密碼並不相同</span>}
            </div>

            <button type='submit' className='btn btn-large mt-6 text-center'>送出</button>   
          </form>
        </div>
      </div>
    </>

  )
}

export default Register