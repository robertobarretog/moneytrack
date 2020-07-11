import axios from 'axios';

import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  EDIT_TRANSACTION,
  SET_TRANSACTIONS,
  GET_ERRORS,
} from './types';

// ADD_TRANSACTION
export const addTransaction = transactionData => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.post('/api/transactions', transactionData);
    dispatch({ type: ADD_TRANSACTION, transaction: res.data });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

// REMOVE_TRANSACTION
export const removeTransaction = id => async dispatch => {
  try {
    await axios.delete(`/api/transactions/${id}`);
    dispatch({ type: REMOVE_TRANSACTION, id });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

// EDIT_TRANSACTION
export const editTransaction = (id, updates) => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.put(`/api/transactions/${id}`, updates);
    dispatch({ type: EDIT_TRANSACTION, updates });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

// SET_TRANSACTIONS
export const setTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/transactions');
    dispatch({ type: SET_TRANSACTIONS, transactions: res.data });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

// Clear errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Get errors
export const getErrors = payload => ({ type: GET_ERRORS, payload });
