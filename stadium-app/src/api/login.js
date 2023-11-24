import { axios } from 'axios'
import { PROD_API_URL } from '../config/config'

const login = (data) => {
  return (
    axios({
      method: 'post',
      url: `${PROD_API_URL}/user/signin`,
      data: {data}
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.err(err)
    })
  )
}

export default login
