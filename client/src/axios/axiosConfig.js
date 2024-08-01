import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../services/cookiesService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { actions } from "../redux/slices/userSlice";


export const baseRequest = axios.create({
    baseURL: "http://localhost:4080",

    headers: {
        Accept: `application/json`
    }
});

baseRequest.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    return config;
});

export const AxiosInterceptorGate = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unauthorizedInterceptor = baseRequest.interceptors.response.use((response) => {
            return response;
        }, (err) => {
            if (err.response.status === 401) {
                removeCookie("accessToken");
                dispatch(actions.logout(null));
                navigate('/login');

            }
            return Promise.reject(err);
        })

        return () => baseRequest.interceptors.response.eject(unauthorizedInterceptor);
  
    }, [])
    return children
}

