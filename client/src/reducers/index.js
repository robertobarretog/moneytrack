import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import transactionsReducer from './transactionsReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  filters: filtersReducer,
  transactions: transactionsReducer,
});
