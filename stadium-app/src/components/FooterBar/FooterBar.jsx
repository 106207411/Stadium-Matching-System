import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import './FooterBar.scss'

const FooterBar = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('home')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(`/${newValue}`)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        value="notifications"
        icon={<NotificationsNoneOutlinedIcon />}
      />
      <BottomNavigationAction 
        value="list"
        icon={<ListAltIcon />}
      />
      <BottomNavigationAction
        value="home"
        icon={<HomeOutlinedIcon />}
      />
      <BottomNavigationAction
        value="favorites"
        icon={<FavoriteBorderOutlinedIcon />}
      />
      <BottomNavigationAction 
        value="profile" 
        icon={<AccountCircleOutlinedIcon />}
      />
    </BottomNavigation>
  )
}

export default FooterBar
