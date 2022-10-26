import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://noble-express.herokuapp.com/api/"
})