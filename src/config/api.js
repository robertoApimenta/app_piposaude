import axios from 'axios'

export default axios.create({
    baseURL: 'https://piposaude.herokuapp.com/'
    //baseURL: process.env.REACT_APP_API_URL
})