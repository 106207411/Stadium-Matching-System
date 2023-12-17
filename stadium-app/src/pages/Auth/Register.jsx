import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import './Register.scss'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    self_intro: "",
    gender: "",
    baseball: false,
    tableTennis: false,
    basketball: false,
    badminton: false,
    volleyball: false,
    tennis: false,
    swimming: false,
    gym: false,
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
        <input className="textbox" name="name" placeholder="至少2個字, 大家會看到這名稱喔" onChange={handleChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">帳號</div>
        <input className="textbox" name="email" placeholder="電子信箱" onChange={handleChange}/>
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
      <div className="textbox-group-horizontal">
        <div className="textbox-group">
          <div className="textbox-title">年紀</div>
          <input className="textbox" name="age" placeholder="18" onChange={handleChange}/>
        </div>
        <div className="textbox-group">
          <FormControl>
            <FormLabel className="textbox-title">性別</FormLabel>
            <RadioGroup
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">自我介紹</div>
        <input className="textbox" name="self_intro" placeholder="讓大家認識你~!" onChange={handleChange}/>
      </div>
      <div className="button" onClick={handleClickNextStep}>下一步</div>
    </div>
  )
}

export default Register
