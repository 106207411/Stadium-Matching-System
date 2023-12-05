import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './Login.scss'
import { useState } from "react"

const Login = () => {
  const { loginHandler } = useAuth()
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

  const handleLoginClick = () => {
    loginHandler(loginInfo)
    navigate('/home')
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
    </div>
  )
}

export default Login
