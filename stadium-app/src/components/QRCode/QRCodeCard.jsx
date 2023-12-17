import ReactDOM from 'react-dom'
import {QRCodeCanvas} from 'qrcode.react'
import Avatar from '@mui/material/Avatar'
import avatarSrc from '../../assets/user-icon.png'
import './QRCodeCard.scss'

const QRCode = () => {
  return (
    <div className='qrcode-container'>
      <Avatar alt='user' src={avatarSrc} />
      <QRCodeCanvas value="https://reactjs.org/" />
    </div>
  )
}

export default QRCode
