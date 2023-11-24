import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Radio from '@mui/material/Radio'
import './Register.scss'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    account: '',
    password: '',
    age: 0,
    note: '',
    gender: '',
    interest: {
      baseball: false,
      tableTennis: false,
      basketball: false,
      badminton: false,
      volleyball: false,
      tennis: false,
      swimming: false,
      gym: false,
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // Error Handling
    /*
    if (name == 'username') {}
    if (name == 'account') {}
    if (name == 'password') {}
    if (name == 'age') {}
    */

    setFormData(prevState => ({ ...prevState, [name]: value }))
    console.log(formData)
  }

  const handleClickBack = () => {
    navigate('/')
  }

  const handleClickNextStep = () => {
    localStorage.setItem('registerInfo', JSON.stringify(formData))
    navigate('/register/sportType')
  }

  return (
    <div className="div">
      <h1>
        <ArrowBackIcon onClick={handleClickBack} />註冊
      </h1>
      <div className="textbox-group">
        <div className="textbox-title">名稱</div>
        <input className="textbox" name="username" placeholder="至少2個字, 大家會看到這名稱喔" onChange={handleChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">帳號</div>
        <input className="textbox" name="account" placeholder="直接用信箱嗎？" onChange={handleChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">密碼</div>
        <input 
          className="textbox"
          name="password"
          type="password"
          placeholder="至少8個英文字母 (需包含大小寫)"
          onChange={handleChange}
        />
      </div>
      <div className="textbox-group">
        <div className="textbox-title">年紀</div>
        <input className="textbox" name="age" placeholder="18" onChange={handleChange}/>
      </div>
      <div>

      </div>
      <div className="textbox-group">
        <div className="textbox-title">自我介紹</div>
        <input className="textbox" name="note" placeholder="讓大家認識你~!" onChange={handleChange}/>
      </div>
      <button className="button" onClick={handleClickNextStep}>下一步</button>
    </div>
  )
}

export default Register
