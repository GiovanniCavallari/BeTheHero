import axios from 'axios'

const api = axios.create({
    baseURL: 'http://e95cb94f.ngrok.io'
})

export default api