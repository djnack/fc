import axios from "axios";
import {
    getToken
} from "../servises/Token";

let csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
let XSRF_TOKEN = getCookie('XSRF-TOKEN')

const defaultOptions = {
    headers: {
        Cookie: document.cookie,
    },
};

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers['crossDomain'] = true;
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
axios.defaults.headers.common["X-XSRF-TOKEN"] = XSRF_TOKEN;
axios.defaults.baseURL = process.env.MIX_REACT_APP_BASE_URL

function gettoken() {
    const token = getToken()
    axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : null
}


export function get(url, config = {}) {
    gettoken()
    return axios.get(url, { ...defaultOptions, ...config })
        .then(resposne => resposne.data)
        .catch(error => error)
}

export function Post(url, data, config = {}) {
    gettoken()
    return axios.post(url, data, { ...defaultOptions, ...config })
        .then(resposne => resposne.data)
        .catch(error => error)
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
