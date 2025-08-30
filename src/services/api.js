import axios from 'axios'
import md5 from 'md5'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },

})

api.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    u: import.meta.env.VITE_API_USER,
    t: md5(import.meta.env.VITE_API_PASS + import.meta.env.VITE_API_SALT),
    s: import.meta.env.VITE_API_SALT,
    v: import.meta.env.VITE_API_VER,
    c: import.meta.env.VITE_API_CLIENT
  }
  return config
})


export default api
