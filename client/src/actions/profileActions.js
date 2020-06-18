import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, GET_ERRORS } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => (console.log("data in getcurrentprofile"),console.log(res.data),dispatch({
            type: GET_PROFILE,
            payload: res.data
        })))
        .catch(err => dispatch({ //if err logged in to empty profile page
            type: GET_PROFILE,
            payload: {}
        }))
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//Add Movie
export const addMovie = (movieData, history) => dispatch => {
    axios.post('/api/profile/movies',movieData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const addShow = (showData, history) => dispatch => {
    axios.post('/api/profile/shows', showData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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