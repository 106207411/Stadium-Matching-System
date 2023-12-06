import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Login.scss'

const Login = () => {
  const { loginHandler, isAuth, authError } = useAuth()
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setLoginInfo(prevState => ({ ...prevState, [name]: value}))
  }

  const handleBackClick = () => {
    navigate('/')
  }

  const handleLoginClick = async () => {
    // Check if email and password are not empty
    if (!loginInfo.email) {
      toast.error('請輸入帳號')
      return
    }
    if (!loginInfo.password) {
      toast.error('請輸入密碼')
      return
    }

    await loginHandler(loginInfo)
      .then((res) => {
        if (res) {
          navigate('/home')
        } else {
          toast.error('信箱或密碼錯誤')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="div">
      <h1>
        <ArrowBackIcon onClick={handleBackClick} />登入
      </h1>
      <div className="textbox-group">
        <div className="textbox-title">帳號</div>
        <input className="textbox" name="email" onChange={handleChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">密碼</div>
        <input className="textbox" type="password" name="password" onChange={handleChange}/>
      </div>
      <button className="button" onClick={handleLoginClick}>登入</button>
      <ToastContainer />
    </div>
  )
}

export default Login
