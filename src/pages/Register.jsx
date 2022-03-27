import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
})

const { name, email, password, password2 } = formData
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

  if(password !== password2){
    toast.error('Passwords do not match')
  }else{
    const userData = { name, email, password}
    dispatch(register(userData))
  }
}

if(isLoading){
  return <Spinner/>
}

  return (
    <>
    <section className='heading'><h1><FaUser/>Register</h1>
    <p>Please create an account</p>
    </section>

    <section className="form">      
      <form action onSubmit={onSubmit}>
        <div className="form-group">
        <input type="text" name="name" id="name" value={name} placeholder='Enter your name' className="formControl" onChange={onChange} />
        </div>
        <div className="form-group">
        <input type="email" name="email" id="email" value={email} placeholder='Enter your email address' className="formControl" onChange={onChange} />
        </div>
        <div className="form-group">
        <input type="password" name="password" id="password" value={password} placeholder='Enter your password' className="formControl" onChange={onChange} />
        </div>
        <div className="form-group">
        <input type="password" name="password2" id="password2" value={password2} placeholder='Confirm your password' className="formControl" onChange={onChange} />
        </div>

        <div className="form-group">
          <button type='submit' className="btn btn-block">Submit</button>
        </div>

      </form>
    </section>
    </>
  )
}

export default Register