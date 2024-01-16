import axios from "axios";

//axios instance for api calls
const axiosinstance = axios.create(
    {
        baseURL: 'https://api.themoviedb.org/3'
    }
)
export default axiosinstance