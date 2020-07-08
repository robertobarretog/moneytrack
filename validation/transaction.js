import Validator from 'validator';
import isEmpty from './is-empty.js';

const validTypes = ['income', 'expense'];

// var regEx = /^\d{4}-\d{2}-\d{2}$/;
//   if(!dateString.match(regEx)) return false;  // Invalid format
//   var d = new Date(dateString);
//   var dNum = d.getTime();
//   if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
//   return d.toISOString().slice(0,10) === dateString;

const validateTransactionInput = data => {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : '';
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
    if (!data.date.match(/^\d+$/)) {
      errors.date = 'Invalid date';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTransactionInput;
