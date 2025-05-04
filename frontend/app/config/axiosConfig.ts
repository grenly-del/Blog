import axios from 'axios'
import Cookies from 'js-cookie';


const url = `http://${import.meta.env.VITE_HOSTNAME_BE}:${import.meta.env.VITE_PORT_BE}/api/v1`
const token = Cookies.get('auth_token')
const instance = axios.create({
    baseURL: url,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    
    }
});


export default instance