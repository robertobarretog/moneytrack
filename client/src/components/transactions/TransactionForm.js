import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Input from '../common/Input';
import Select from '../common/Select';
import SubmitBtn from '../common/SubmitBtn';

const TransactionForm = ({ transaction = null, onSubmit, globalErrors }) => {
  const [description, setDescription] = useState(
    transaction ? transaction.description : ''
  );
  const [amount, setAmount] = useState(
    transaction ? (transaction.amount / 100).toString() : ''
  );
  const [type, setType] = useState(transaction ? transaction.type : 'expense');
  const [date, setDate] = useState(
    transaction ? moment(transaction.data) : moment()
  );
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(globalErrors);
  }, [globalErrors]);

  const onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmount(amount);
    }
  };

  const onDateChange = date => {
    if (date) {
      setDate(date);
    }
  };

  const onFocusChange = ({ focused }) => {
    setCalendarFocused(focused);
  };

  // Options for select list
  const options = [
    { label: 'Expense', value: 'expense' },
    { label: 'Income', value: 'income' },
  ];

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit({
      description,
      amount,
      type,
      date: date.valueOf(),
    });
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center p-6 bg-gray-300 mt-5 rounded-lg shadow-xl">
      <form onSubmit={onFormSubmit} className="flex flex-col mt-6 w-full">
        <small className="text-blue-600 font-bold text-md mb-3">
          * = required fields
        </small>
        <Input
          placeholder="Description"
          name="description"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Input
          placeholder="Amount *"
          name="amount"
          label="Amount *"
          info="Valid format: 0.00. e.g. 17.35"
          value={amount}
          onChange={onAmountChange}
          error={errors.amount}
        />
        <Select
          label="Transaction Type *"
          name="type"
          options={options}
          value={type}
          onChange={e => setType(e.target.value)}
          error={errors.type}
        />
        <label
          className="block text-orange-500 text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date *
        </label>
        <SingleDatePicker
          date={date}
          onDateChange={onDateChange}
          focused={calendarFocused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <SubmitBtn value="Save" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  globalErrors: state.errors,
});

export default connect(mapStateToProps)(TransactionForm);
