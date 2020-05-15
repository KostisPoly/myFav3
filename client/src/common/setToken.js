import axios from 'axios';

//if token exists pass to every request auth headers
const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;