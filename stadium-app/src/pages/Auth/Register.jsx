import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { ToastContainer, toast } from 'react-toastify'
import { validatePasswordFormat } from '../../lib/utils/authValidator'
import 'react-toastify/dist/ReactToastify.css'
import './Register.scss'

// 是否要實作 pre-flight email exist or not check
// 到填完興趣才說信箱已存在 UX 不太好

const Register = () => {
  const { signUpHandler } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    self_intro: "",
    gender: "",
    baseball: 0,
    tabletennis: 0,
    basketball: 0,
    badminton: 0,
    volleyball: 0,
    tennis: 0,
    swimming: 0,
    gym: 0,
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target

    // TODO: Error detecting in real-time

    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleClickBack = () => {
    navigate('/')
  }

  const handleClickNextStep = async () => {
    localStorage.setItem('registerInfo', JSON.stringify(formData))

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.age === 0 ||
      formData.gender === "" || 
      formData.self_intro === ""
    ) {
      toast.warning("你還有資訊未完成填寫喔！")
      return
    }

    // Check if password format is correct
    if (!validatePasswordFormat(formData.password)) {
      toast.error("密碼格式錯誤喔！")
      return
    }

    // This is for preflight check
    await signUpHandler({ email: formData.email })
      .then((res) => {
        console.log(res)
        if (res === 'Email already exists') {
          toast.error('信箱已存在！')
          return
        } else {
          // Only when E-mail pass the pre-flight check can navigate to next step
          navigate('/register/sportType')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="div">
      <h1>
        <ArrowBackIcon onClick={handleClickBack} />註冊
      </h1>
      <div className="textbox-group">
        <div className="textbox-title">名稱</div>
        <input className="textbox" name="name" placeholder="至少2個字, 大家會看到這名稱喔" onChange={handleFormChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">帳號</div>
        <input className="textbox" name="email" placeholder="電子信箱" onChange={handleFormChange}/>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">密碼</div>
        <input 
          className="textbox"
          name="password"
          type="password"
          placeholder="至少8個英文字母 (需包含大小寫)"
          onChange={handleFormChange}
        />
      </div>
      <div className="textbox-group-horizontal">
        <div className="textbox-group">
          <div className="textbox-title">年紀</div>
          <input className="textbox" name="age" placeholder="18" onChange={handleFormChange}/>
        </div>
        <div className="textbox-group">
          <FormControl>
            <FormLabel className="textbox-title">性別</FormLabel>
            <RadioGroup
              name="gender"
              onChange={handleFormChange}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="textbox-group">
        <div className="textbox-title">自我介紹</div>
        <input className="textbox" name="self_intro" placeholder="讓大家認識你~!" onChange={handleFormChange}/>
      </div>
      <div className="button" onClick={handleClickNextStep}>下一步</div>
    </div>
  )
}

export default Register
