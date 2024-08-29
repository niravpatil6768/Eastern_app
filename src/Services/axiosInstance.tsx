import axios from "axios";
import { getToken } from "../utils/localStorage";


const axiosInstance = axios.create({
    baseURL: "https://interview.optimavaluepro.com/api/v1/"
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
      }
)

export default axiosInstance;