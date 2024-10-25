import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { BASEURL } from '@utils/constants/requestConstants'
const TIMEOUT = 60000

// if you want another config, create one!!
const DEFAULTCONFIG: AxiosRequestConfig = {
    baseURL: BASEURL,
    timeout: TIMEOUT
}

const request = Axios.create(DEFAULTCONFIG)


request.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error: AxiosError) {
        return Promise.reject(error)
    }
)

export default request
