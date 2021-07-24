// 封装axios
import axios from 'axios'

axios.defaults.baseURL = 'http://47.98.50.20:12000'
const http = axios.create({
    timeout: 1000 * 30,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept':'*/*'
    }
  })

//暴露
 export default http