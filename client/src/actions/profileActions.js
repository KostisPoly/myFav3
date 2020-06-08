import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => (console.log(res.data),dispatch({
            type: GET_PROFILE,
            payload: res.data
        })))
        .catch(err => dispatch({ //if err logged in to empty profile page
            type: GET_PROFILE,
            payload: {}
        }))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}