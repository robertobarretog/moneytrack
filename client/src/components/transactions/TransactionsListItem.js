import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { withRouter } from 'react-router-dom';
import { EditIcon, EyeIcon, TrashIcon } from '../common/Icons/Icons';

const TransactionsListItem = ({
  _id,
  description,
  amount,
  date,
  type,
  history,
  onDeleteClick,
}) => {
  const onEditClick = () => history.push(`/edit/${_id}`);

  const onViewClick = () => history.push(`/transaction/${_id}`);

  const amountClasses =
    type === 'income'
      ? 'px-6 py-4 whitespace-no-wrap border-b text-green-600 border-gray-500 leading-5'
      : 'px-6 py-4 whitespace-no-wrap border-b text-red-600 border-gray-500 leading-5';

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 hide-on-mobile">
          <div className="flex items-center">
            <div>
              <div className="leading-5 text-gray-800">
                {description.length > 15
                  ? description.slice(0, 15) + '...'
                  : description}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 hide-on-mobile">
          <div className="leading-5 text-blue-900">
            {moment(date).format('MMMM Do, YYYY')}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 leading-5 hide-on-md">
          {type}
        </td>
        <td className={amountClasses}>
          {numeral(amount / 100).format('$0,0.00')}
        </td>
        <td className="px-6 py-4 flex border-b border-gray-500 leading-5">
          <EyeIcon onViewClick={onViewClick} />
          <EditIcon onEditClick={onEditClick} />
          <TrashIcon onDeleteClick={() => onDeleteClick(_id)} />
        </td>
      </tr>
    </>
  );
};

export default withRouter(TransactionsListItem);
