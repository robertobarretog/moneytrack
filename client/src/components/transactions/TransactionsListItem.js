import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { withRouter } from 'react-router-dom';

const TransactionsListItem = ({
  _id,
  description,
  amount,
  date,
  type,
  history,
}) => {
  const onTransactionItemClick = () => {
    history.push(`/edit/${_id}`);
  };

  const amountClasses =
    type === 'income'
      ? 'border px-8 py-4 text-green-600'
      : 'border px-8 py-4 text-red-600';

  return (
    <tr className="cursor-pointer" onClick={onTransactionItemClick}>
      <td className="border px-8 py-4">{description}</td>
      <td className="border px-8 py-4 hide-on-xs">
        {moment(date).format('MMMM Do, YYYY')}
      </td>
      <td className="border px-8 py-4 hide-on-mobile">{type}</td>
      <td className={amountClasses}>
        {numeral(amount / 100).format('$0,0.00')}
      </td>
    </tr>
  );
};

export default withRouter(TransactionsListItem);
