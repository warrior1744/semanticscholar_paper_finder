import React, {useState, useEffect, useContext} from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import {useForm} from 'react-hook-form'
import {FaEye} from 'react-icons/fa'
import {FaEyeSlash} from 'react-icons/fa'
import { updateUserProfile } from '../context/user/UserActions'


function Profile() {

  const {userLogin} = useContext(UserContext)  
  const {userInfo} = userLogin
  const navigate = useNavigate()

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
  }, [navigate, userInfo])

  return (
    <>
      <div className="container px-6">
        <h1 className='block text-4xl mb-6 text-center'>Profile</h1>
          <div>
            <Link className='btn btn-large mt-6 text-center' to='/'>回首頁</Link>
            <ProfileInputs userInfo={userInfo}/>
          </div>
      </div>
    </>
  )
}


const ProfileInputs = ({userInfo}) => {

  const { _id, firstname, lastname, email, isAdmin} = userInfo
  const [ passwordType, setPasswordType] = useState('password')
  const { register, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: '',
      confirmPassword: ''
    }
  })

  const {userDispatch, updateProfile} = useContext(UserContext)  
  const togglePasswordType = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }

  useEffect(() => {
    if(updateProfile){
      userDispatch({type: 'USER_UPDATE_PROFILE_RESET'})
    }
  }, [])

  const onSubmit = async (data) => {
    await updateUserProfile(data, userDispatch, userInfo)
  }

  return (
      <>
        <div className="mt-6 gap-6 mb-4 flex flex-row justify-even">       
          <div className='w-2/5 text-center flex flex-col items-left'>
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
                  <span className='w-2/5'>Current Password</span>
                  <input {...register('currentPassword', {
                          required: true})}
                          type="password"
                          autoComplete='current-password'
                          id='currentPassword'
                          className="input input-bordered w-full" />
                </label>
              </div>

              <div className="mb-4">
                <label className="input-group">
                  <span className='w-2/5'>Password</span>
                  <input {...register('password', {
                          pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                          required: true})}
                          type={passwordType}
                          className="input input-bordered w-full" />
                          <span>
                            <button onClick={togglePasswordType}
                          >
                            {passwordType === 'password' ? <FaEye/> : <FaEyeSlash/>}
                            </button>
                          </span>
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
            {!updateProfile.updateProfileSuccess && (
                  <div className='text-center mb-4'>
                    <button type='submit'
                            className='btn btn-large mt-6 text-center w-full'
                      >送出
                    </button>
                  </div>
              )
            }
            </form>
            {updateProfile.updateProfileSuccess && <span>更新成功</span>}
          </div>
          <div>
            <h3>您的ID: {_id}</h3>
            <h3>您的權限: {isAdmin ? '管理員' : '一般使用者'}</h3>
            
          </div>
      </div>
      </>
  )
}

export default Profile

