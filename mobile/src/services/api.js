import axios from 'axios'

const api = axios.create({
    baseURL: 'http://b5889769.ngrok.io'
})

export default api