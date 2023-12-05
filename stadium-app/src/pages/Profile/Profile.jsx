import Header from '../../components/Header/Header'
import Footer from '../../components/FooterBar/FooterBar'
import QRCode from '../../components/QRCode/QRCodeCard'
import Rating from '@mui/material/Rating'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Profile.scss'

const Profile = () => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Parse the user profile from localStorage and update the state
    const storedProfile = localStorage.getItem('userProfile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  }, [])

  // Function to render ratings for sports with a non-zero value
  const renderSportsRatings = () => {
    if (!profile) return null

    const sports = Object.keys(profile).filter(key => key !== 'user_id' && profile[key] !== 0)
    return sports.map(sport => (
      <div key={sport}>
        <Text component="span">{sport.charAt(0).toUpperCase() + sport.slice(1)}: </Text>
        <Rating name={sport} value={profile[sport]} readOnly size="small" />
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
          <Text>姓名: {profile.user_id}</Text>
          <Text>性別: {profile.user_id}</Text>
          <Text>電話: {profile.user_id}</Text>
          <Text>E-mail: {profile.user_id}</Text>
          <Text>年紀: {profile.user_id}</Text>
          <Text>擅長運動: </Text>
          {renderSportsRatings()}
          <br />
          <Text>自我介紹: {profile.user_id}</Text>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
