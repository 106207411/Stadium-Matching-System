import axios from 'axios'
import { PROD_API_URL, API_URL } from '../../config/config'

export const login = (data) => {
  return (
    axios({
      method: 'post',
      withCredentials: true,
      url: `${PROD_API_URL}/user/signin`,
      data: data
    })
  )
}

export const signUp = (data) => {
  console.log(data)
  return (
    axios({
      method: 'post',
      url: `${PROD_API_URL}/user/signup`,
      data: data
    })
  )
}
