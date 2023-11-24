import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './Login.scss'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleClickBack = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    login()
    navigate('/home')
  }

  return (
    <div className="div">
      <h1>
        <ArrowBackIcon onClick={handleClickBack} />登入
      </h1>
      <div className="textbox-group">
        <div className="textbox-title">帳號</div>
        <input className="textbox"/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">密碼</div>
        <input className="textbox" type="password"/>
      </div>
      <button className="button" onClick={handleLoginClick}>登入</button>
    </div>
  )
}

export default Login
