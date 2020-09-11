import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  EDIT_TRANSACTION,
  SET_TRANSACTIONS,
  SET_TRANSACTION,
  TRANSACTIONS_LOADING,
  STOP_LOADING,
} from '../actions/types';

const transactionsInitialState = {
  transactions: [],
  transaction: {},
  loading: false,
  pager: {},
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
    case SET_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
        pager: action.pager,
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
