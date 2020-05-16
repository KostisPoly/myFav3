import axios from 'axios';
import setAuthToken from '../common/setToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(
            err => (console.log(err.response), dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            }))
        );
};

export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', useData)
        .then(res => {
            //Save jwt to localstorage and auth headers
            const { token } = res.data; //STRING
            localStorage.setItem('jwt', token);
            setAuthToken(token);
            const tokenDecoded = jwt_decode(token);
            //dispatch user data and if not empty authorize in reducer
            dispatch(currentUser(tokenDecoded));

        })
        .then(() => {history.push('/dashboard')})
        .catch(
            err => (console.log(err.response), dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })) 
            
        );
}

export const currentUser = (tokenDecoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: tokenDecoded 
    }
}