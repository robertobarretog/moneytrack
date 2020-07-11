import Validator from 'validator';
import isEmpty from './is-empty.js';

const validTypes = ['income', 'expense'];

const validateTransactionInput = data => {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? String(data.amount) : '';
  data.type = !isEmpty(data.type) ? data.type : '';

  if (!data.amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
    errors.amount = 'Invalid amount';
  }

  if (validTypes.indexOf(data.type) === -1) {
    errors.type = 'Invalid transaction type';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount is required';
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Transaction type is required';
  }

  if (!isEmpty(data.date)) {
    if (!String(data.date).match(/^\d+$/)) {
      errors.date = 'Invalid date';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTransactionInput;
