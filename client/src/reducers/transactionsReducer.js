import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  EDIT_TRANSACTION,
  SET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
  STOP_LOADING,
} from '../actions/types';

const transactionsInitialState = {
  transactions: [],
  loading: false,
};

export default (state = transactionsInitialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.transaction],
      };
    case REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.id
        ),
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
      };
    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction => {
          if (transaction.id === action.id) {
            return {
              ...transaction,
              ...action.updates,
            };
          } else {
            return transaction;
          }
        }),
      };
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
