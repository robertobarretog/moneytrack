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
      ? 'px-6 py-4 whitespace-no-wrap border-b text-green-700 border-gray-500 text-sm leading-5'
      : 'px-6 py-4 whitespace-no-wrap border-b text-red-700 border-gray-500 text-sm leading-5';

  return (
    <>
      <tr className="cursor-pointer" onClick={onTransactionItemClick}>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <div className="text-sm leading-5 text-gray-800 break-all">
                {description}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="text-sm leading-5 text-blue-900 hide-on-xs">
            {moment(date).format('MMMM Do, YYYY')}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5 hide-on-mobile">
          {type}
        </td>
        <td className={amountClasses}>
          {numeral(amount / 100).format('$0,0.00')}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
          <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
            View Details
          </button>
        </td>
      </tr>
    </>
  );
};

export default withRouter(TransactionsListItem);
