import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Rating from '@mui/material/Rating'
import { translate } from "../../lib/utils/translator"
import { toast } from "react-toastify"
import './SportRating.scss'

const SportRating = () => {
  const navigate = useNavigate()
  const { signUpHandler } = useAuth()
  const registerInfo = JSON.parse(localStorage.getItem('registerInfo'))
  const interestSportType = Object.fromEntries(
    Object.entries(registerInfo)
      .filter(([key, value]) => value === true)
      .map(([key]) => [key, 1])
  )
  const [rating, setRating] = useState(interestSportType)
  
  // map rating number to registerInfo
  const mapValues = (registerInfo, rating) => {
    for (let key in registerInfo) {
      if (rating.hasOwnProperty(key)) {
        registerInfo[key] = rating[key]
      }
      else if (typeof registerInfo[key] === 'boolean' && registerInfo[key] === false) {
        registerInfo[key] = -1
      }
    }
  }

  const handleClickRegister = async () => {
    let finalRegisterInfo = registerInfo
    mapValues(finalRegisterInfo, rating)
    await signUpHandler(registerInfo)
      .then((res) => {
        console.log(res)
        // 理論上在這個 Page 也不會走到前 3 個 block
        if (res === 'Missing value') {
          toast.warning(authTranslator(res))
        } else if (res === 'Invalid email format') {
          toast.warning(authTranslator(res))
        } else if (res === 'Email already exists') {
          toast.warning(authTranslator(res))
        } else {
          toast.success('註冊成功')
          navigate('/')
        }
    })
  }

  return (
    <div className="main-container">
      <div className="title">你的擅長程度?</div>
      <div className="rating-group">
        {Object.keys(interestSportType).map((sport) => (
          <div key={sport} className="rating-container">
            <div className="rating-item">
              <div className="sport-name">{translate(sport)}</div>
              <Rating
                size="large"
                defaultValue={5}
                value={rating[sport]}
                onChange={(event, newValue) => {
                  setRating(prev => ({ ...prev, [sport]: newValue }))
                  console.log(rating)
                  console.log(registerInfo)
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="button-group">
        <div className="button" onClick={handleClickRegister}>註冊</div>
      </div>
    </div>
  )
}

export default SportRating
