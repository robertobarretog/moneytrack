import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const TransactionsListItem = ({ _id, description, amount, date }) => (
  <Link to={`/edit/${_id}`}>
    <div>
      <h3>{description}</h3>
      <span>{moment(date).format('MMMM Do, YYYY')}</span>
    </div>
    <h3>{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
);

export default TransactionsListItem;
