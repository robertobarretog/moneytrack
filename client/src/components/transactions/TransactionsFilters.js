import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  sortByType,
  setStartDate,
  setEndDate,
} from '../../actions/filterActions';
import { setTransactions } from '../../actions/transactionsActions';
import Input from '../common/Input';
import Select from '../common/Select';

const TransactionsFilters = props => {
  const [calendarFocused, setCalendarFocused] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(
      () => {
        props.setTextFilter(description);
        props.setTransactions();
      },
      description ? 1000 : 0
    );

    return () => clearTimeout(delayTimer);
    // eslint-disable-next-line
  }, [description]);

  const onDatesChange = ({ startDate, endDate }) => {
    props.setStartDate(startDate);
    props.setEndDate(endDate);
    props.setTransactions();
  };

  const onSortChange = sortBy => {
    if (sortBy === 'date') {
      props.sortByDate();
    } else if (sortBy === 'amount') {
      props.sortByAmount();
    } else {
      props.sortByType();
    }

    props.setTransactions();
  };

  const options = [
    { label: 'Date', value: 'date' },
    { label: 'Amount', value: 'amount' },
    { label: 'Type', value: 'type' },
  ];

  return (
    <>
      <h1 className="container mx-auto text-center p-3 mt-5 text-xl">
        Filter Transactions by description or date
      </h1>
      <div className="container mx-auto mt-3 flex justify-center items-center p-3">
        <div className="mr-2 mb-2 text-xl">
          <Input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="container mx-auto text-center">
        <DateRangePicker
          startDate={props.filters.startDate}
          startDateId={'startDateId'}
          endDate={props.filters.endDate}
          endDateId={'endDateId'}
          onDatesChange={onDatesChange}
          focusedInput={calendarFocused}
          onFocusChange={calendarFocused => setCalendarFocused(calendarFocused)}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
      <div className="container mx-auto flex justify-center items-center mt-3">
        <span className="self-center mr-2">Sort By</span>
        <Select
          options={options}
          value={props.filters.sortBy}
          onChange={e => onSortChange(e.target.value)}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps, {
  setTextFilter,
  sortByAmount,
  sortByDate,
  sortByType,
  setStartDate,
  setEndDate,
  setTransactions,
})(TransactionsFilters);
