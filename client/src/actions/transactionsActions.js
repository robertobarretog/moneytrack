import axios from 'axios';

import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  EDIT_TRANSACTION,
  SET_TRANSACTIONS,
  SET_TRANSACTION,
  TRANSACTIONS_LOADING,
  STOP_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
} from './types';

// ADD_TRANSACTION
export const addTransaction = (transactionData, history) => async dispatch => {
  dispatch(transactionsLoading());
  dispatch(clearErrors());
  try {
    const res = await axios.post('/api/transactions', transactionData);
    dispatch({ type: ADD_TRANSACTION, transaction: res.data });
    history.push('/dashboard');
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopLoading());
  }
};

// REMOVE_TRANSACTION
export const removeTransaction = (id, page, pageSize) => async dispatch => {
  dispatch(transactionsLoading());
  try {
    await axios.delete(`/api/transactions/${id}`);
    dispatch({ type: REMOVE_TRANSACTION, id });
    dispatch(setTransactions(page, pageSize));
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopLoading());
  }
};

// EDIT_TRANSACTION
export const editTransaction = (id, updates, history) => async dispatch => {
  dispatch(transactionsLoading());
  dispatch(clearErrors());
  try {
    await axios.put(`/api/transactions/${id}`, updates);
    dispatch({ type: EDIT_TRANSACTION, updates });
    history.push('/dashboard');
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopLoading());
  }
};

// SET_TRANSACTIONS
export const setTransactions = (page = 1, pageSize = 5) => async (
  dispatch,
  getState
) => {
  dispatch(transactionsLoading());
  try {
    const { sortBy, startDate, endDate, text } = getState().filters;
    const res = await axios.get(
      `/api/transactions?page=${page}&pageSize=${pageSize}&startDate=${startDate._d}&endDate=${endDate._d}&sortBy=${sortBy}&description=${text}`
    );
    dispatch({
      type: SET_TRANSACTIONS,
      transactions: res.data.pageOfItems,
      pager: res.data.pager,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopLoading());
  }
};

// SET_TRANSACTION
export const setTransaction = id => async dispatch => {
  dispatch(transactionsLoading());
  try {
    const res = await axios.get(`/api/transactions/${id}`);
    dispatch({
      type: SET_TRANSACTION,
      transaction: res.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  } finally {
    dispatch(stopLoading());
  }
};

// TRANSACTIONS_LOADING
export const transactionsLoading = () => ({ type: TRANSACTIONS_LOADING });

// STOP_LOADING
export const stopLoading = () => ({ type: STOP_LOADING });

// CLEAR_ERRORS
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// GET_ERRORS
export const getErrors = payload => ({ type: GET_ERRORS, payload });
