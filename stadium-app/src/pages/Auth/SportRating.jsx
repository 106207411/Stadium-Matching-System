import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Rating from '@mui/material/Rating'
import './SportRating.scss'

const SportRating = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const registerInfo = JSON.parse(localStorage.getItem('registerInfo'))
  const interestSport = Object.fromEntries(
    Object.entries(registerInfo.interest)
      .filter(([key, value]) => value === true)
      .map(([key]) => [key, 0])
  )
  const [rating, setRating] = useState(interestSport)

  const handleClickRegister = () => {
    registerInfo.interest = rating
    register(registerInfo)
    console.log(registerInfo)
    navigate('/home')
  }

  console.log(rating)

  return (
    <div className="main-containter">
      <div className="title">你的擅長程度?</div>
      {Object.keys(interestSport).map((sport) => (
      <div key={sport} className="rating-container">
        <div className="sport-name">{sport}</div>
        <Rating
          size="large"
          defaultValue={5}
          value={rating[sport]}
          onChange={(event, newValue) => setRating(prev => ({ ...prev, [sport]: newValue }))}
        />
      </div>
    ))}
      <div className="button" onClick={handleClickRegister}>註冊</div>
    </div>
  )
}

export default SportRating
