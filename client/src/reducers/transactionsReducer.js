import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  EDIT_TRANSACTION,
  SET_TRANSACTIONS,
} from '../actions/types';

const transactionsInitialState = [];

export default (state = transactionsInitialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.transaction];
    case REMOVE_TRANSACTION:
      return state.filter(transaction => transaction.id !== action.id);
    case SET_TRANSACTIONS:
      return action.transactions;
    case EDIT_TRANSACTION:
      return state.map(transaction => {
        if (transaction.id === action.id) {
          return {
            ...transaction,
            ...action.updates,
          };
        } else {
          return transaction;
        }
      });
    default:
      return state;
  }
};
