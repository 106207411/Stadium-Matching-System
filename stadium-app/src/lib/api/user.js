import axios from "axios"
import { PROD_API_URL, API_URL } from '../../config/config'

export const getUserProfile = (userId) => {
  console.log(userId)
  return (
    axios({
      method: 'get',
      url: `${PROD_API_URL}/user/profile?userId=${userId}`,
      withCredentials: true,
    })
  );
}

export const updateUserProfile = (data) => {
  return (
    axios({
      method: 'put',
      url: `${PROD_API_URL}/user/profile`,
      withCredentials: true,
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