import axios from 'axios'
import { PROD_API_URL, API_URL } from '../../config/config'

export const login = (data) => {
  return (
    axios({
      method: 'post',
      url: `${PROD_API_URL}/user/signin`,
      data: data
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.err(err)
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
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  )
}
