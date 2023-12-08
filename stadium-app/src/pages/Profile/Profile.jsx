import Header from '../../components/Header/Header'
import Footer from '../../components/FooterBar/FooterBar'
import QRCode from '../../components/QRCode/QRCodeCard'
import Rating from '@mui/material/Rating'
import Text from '@mui/material/Typography'
import translate from '../../lib/utils/translator'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import mockUser from '../../mockData/mockUser'
import './Profile.scss'

const Profile = () => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  }, [])

  const renderSportsRatings = () => {
    if (!mockUser) return null

    const sports = Object.keys(mockUser).filter(key => key !== 'age' && mockUser[key] !== 0 && typeof(mockUser[key]) !== 'string')
    console.log(sports)
    return sports.map(sport => (
      <div key={sport}>
        <Text component="span">{translate(sport)}</Text>
        <Rating name={sport} value={mockUser[sport]} readOnly size="small" />
        <br />
      </div>
    ))
  }

  return (
    <div>
      <Header title="我的資訊" />
      <div className="info-container">
        <QRCode />
        <div className='data-column'>
          <Text>姓名: {mockUser.userName}</Text>
          <Text>性別: {mockUser.gender}</Text>
          <Text>電話: {mockUser.phoneNumber}</Text>
          <Text>信箱: {mockUser.email}</Text>
          <Text>年紀: {mockUser.age}</Text>
          <Text>擅長運動: {renderSportsRatings()}</Text>
          <Text>自我介紹: {mockUser.introduction}</Text>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
