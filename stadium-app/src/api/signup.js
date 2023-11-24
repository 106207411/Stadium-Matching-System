import axios from 'axios'
import { API_URL } from '../config/config'

export const signUp = (data) => {
  console.log(data)
  return (
    axios({
      method: 'post',
      url: `${API_URL}/user/signup`,
      data: {data}
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  )
}

export default signUp
