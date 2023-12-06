import axios from 'axios'
import { PROD_API_URL, API_URL } from '../../config/config'

export const login = (data) => {
  return (
    axios({
      method: 'post',
      url: `${API_URL}/user/signin`,
      data: data
    })
  )
}

export const signUp = (data) => {
  return (
    axios({
      method: 'post',
      url: `${API_URL}/user/signup`,
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
