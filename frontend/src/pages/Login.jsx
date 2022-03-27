import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
})

const { email, password } = formData
const navigate = useNavigate()
const dispatch = useDispatch()
const {user, isLoading, isError, isSuccess, message} = useSelector(
  (state) =>  state.auth
  )

useEffect(() => {
  if(isError){
    toast.error(message)
  }
  if(isSuccess || user){
    navigate('/')    
  }
  dispatch(reset())
}, [user, isError, isSuccess, message, dispatch, navigate])

const onChange = (e) =>{
  setFormData((prevState) =>({
  ...prevState,
  [e.target.name]: e.target.value}))
}
const onSubmit = (e) =>{
  e.preventDefault()
  const userData = {
    email, 
    password
  }
  dispatch(login(userData))
}

if(isLoading){
  return <Spinner/>
}
  return (
    <>
    <section className='heading'><h1><FaSignInAlt/>Login</h1>
    <p>Please log in.</p>
    </section>

    <section className="form">      
      <form action onSubmit={onSubmit}>
        <div className="form-group">
        <input type="email" name="email" id="email" value={email} placeholder='Enter your email address' className="formControl" onChange={onChange} />
        </div>
        <div className="form-group">
        <input type="password" name="password" id="password" value={password} placeholder='Enter your password' className="formControl" onChange={onChange} />
        </div>

        <div className="form-group">
          <button type='submit' className="btn btn-block">Submit</button>
        </div>

      </form>
    </section>
    </>
  )
}

export default Login