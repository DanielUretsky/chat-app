import Cookies from 'universal-cookie';

const cookies = new Cookies(null, {path: '/'});

export const getCookie = (key) => {
    return cookies.get(key);
}

export const setCookie = (key, value, options = {}) => {
    cookies.set(key, value);
}

export const removeCookie = (key) => {
    cookies.remove(key);
}