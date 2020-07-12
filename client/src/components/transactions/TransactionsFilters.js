import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from '../../actions/filterActions';
import Input from '../common/Input';
import Select from '../common/Select';

const TransactionsFilters = props => {
  const [calendarFocused, setCalendarFocused] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    props.setStartDate(startDate);
    props.setEndDate(endDate);
  };

  const options = [
    { label: 'Date', value: 'date' },
    { label: 'Amount', value: 'amount' },
  ];

  return (
    <>
      <h1 className="container mx-auto text-center p-3 mt-5 text-xl">
        Filter Transactions by description, amount or date
      </h1>
      <div className="container mx-auto mt-5 flex justify-center items-center">
        <div className="mr-2 mb-2">
          <Input
            placeholder="Description"
            value={props.filters.text}
            onChange={e => props.setTextFilter(e.target.value)}
          />
        </div>
        <div className="mr-2 mb-2">
          <Select
            options={options}
            value={props.filters.sortBy}
            onChange={e =>
              e.target.value === 'date'
                ? props.sortByDate()
                : props.sortByAmount()
            }
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
  setStartDate,
  setEndDate,
})(TransactionsFilters);
