import { useNavigate } from "react-router-dom"
import './Entry.scss'
import logo from '../../assets/bujo32.svg'

const Entry = () => {
  const navigate = useNavigate();
  
  const handleClickOAuthLogin = () => {
    navigate('/oauth');
  }
  
  const handleClickLogin = () => {
    navigate('/login');
  }

  const handleClickRegister = () => {
    navigate('/register');
  }

  return (
    <div className="div">
      <img
        loading="lazy"
        srcSet={logo}
        className="img"
      />
      <div className="button-group">
        <div className="button" onClick={handleClickLogin}>登入</div>
        <div className="button" onClick={handleClickOAuthLogin}>台積電 ID 登入</div>
        <div className="buttonV2" onClick={handleClickRegister}>點此註冊</div>
      </div>
    </div>
  )
}

export default Entry
