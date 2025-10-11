import axios from "axios";
import { ENV } from "@/constant/url";
import { toast } from "react-toastify";
import router from "next/router"; 

const userAxios = axios.create({
    baseURL: ENV.BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});    

userAxios.interceptors.response.use(
    response => response,
    error => {
        console.log(error)
        const status = error?.response?.status;
        const message =
            error?.response?.data?.message || error?.message || "Something went wrong";
        
        if (status === 401) {
            toast.error("Session expired. Please log in again.");
            router.push("/login");
        }

        // 🚫 Forbidden
        if (status === 403) {
            toast.error("You don’t have permission to do that.");
        }

      
        if (status === 500) {
            toast.error("Server error. Please try again later.");
        }

        // 📡 Network Error
        if (!error.response) {
            toast.error("Network error. Check your internet connection.");
        }

        console.error("API Error:", message);

        return Promise.reject(error);
    }
);

export default userAxios;
