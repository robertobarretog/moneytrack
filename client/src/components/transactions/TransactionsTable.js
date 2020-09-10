import React from 'react';
import TransactionsListItem from './TransactionsListItem';
import Pagination from '../common/Pagination';

const TransactionsTable = ({
  transactions,
  pager,
  getTransactions,
  onDeleteClick,
}) => (
  <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {transactions.map(transaction => (
            <TransactionsListItem
              key={transaction._id}
              {...transaction}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </tbody>
      </table>
      <Pagination pager={pager} getResults={getTransactions} />
    </div>
  </div>
);

export default TransactionsTable;
