import axios from "axios"
import { PROD_API_URL, API_URL } from '../../config/config'

export const getUserProfile = () => {
  return (
    axios({
      method: 'get',
      url: `${PROD_API_URL}/user/profile`,
    })
    .then((res) => {
      console.log(res.data)
      localStorage.setItem('userProfile', JSON.stringify(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  )
}

export const updateUserProfile = (data) => {
  return (
    axios({
      method: 'put',
      url: `${PROD_API_URL}/user/profile`,
      data: data
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  )
}