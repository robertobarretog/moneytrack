import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  SET_AUTH_LOADING,
  STOP_AUTH_LOADING,
} from './types';

// Register User
export const registerUser = (userData, history) => async dispatch => {
  dispatch(authLoading());
  dispatch(clearErrors());
  try {
    await axios.post('/api/users/register', userData);
    return { success: true };
  } catch (err) {
    dispatch(getErrors(err.response.data));
    return { success: false };
  } finally {
    dispatch(stopAuthLoading());
  }
};

// Login - Get User Token
export const loginUser = userData => async dispatch => {
  dispatch(authLoading());
  dispatch(clearErrors());
  try {
    const res = await axios.post('/api/users/login', userData);
    const { token } = res.data;
    // Set token to localStorage
    localStorage.setItem('jwtToken', token);
    // Set token to auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopAuthLoading());
  }
};

// Forgot Password
export const forgotPassword = userData => async dispatch => {
  dispatch(authLoading());
  dispatch(clearErrors());
  try {
    await axios.post('/api/auth/forgotpassword', userData);
    return { success: true };
  } catch (err) {
    dispatch(getErrors(err.response.data));
    return { success: false };
  } finally {
    dispatch(stopAuthLoading());
  }
};

// Forgot Password
export const resetPassword = (token, userData) => async dispatch => {
  dispatch(authLoading());
  dispatch(clearErrors());
  try {
    await axios.put(`/api/auth/resetpassword/${token}`, userData);
    return { success: true };
  } catch (err) {
    dispatch(getErrors(err.response.data));
    return { success: false };
  } finally {
    dispatch(stopAuthLoading());
  }
};

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to an empty object {} which will set isAuthenticated state to false
  dispatch(setCurrentUser({}));
};

// Get errors
export const getErrors = payload => ({
  type: GET_ERRORS,
  payload,
});

// Clear errors
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

// Auth loading
export const authLoading = () => ({ type: SET_AUTH_LOADING });

// Stop auth loading
export const stopAuthLoading = () => ({ type: STOP_AUTH_LOADING });
