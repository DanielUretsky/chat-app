import axios from "axios";
import { getCookie, setCookie } from "../services/cookiesService";


export const baseRequest = axios.create({
    baseURL: "http://localhost:4080",
   
    headers: {
        Accept: `application/json`
    }
});


// ---- INTERCEPTORS ----
baseRequest.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    return config;
});

