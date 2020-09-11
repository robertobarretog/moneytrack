import React, { useState } from 'react';
import TransactionsListItem from './TransactionsListItem';
import Pagination from '../common/Pagination';
import Select from '../common/Select';

// Options for select list
const options = [
  { label: '5 results', value: 5 },
  { label: '10 results', value: 10 },
  { label: '25 results', value: 25 },
];

const TransactionsTable = ({
  transactions,
  pager,
  getTransactions,
  onDeleteClick,
  setPageSize,
}) => {
  const [numOfResults, setNumOfResults] = useState(pager.pageSize || 5);

  const togglePageSize = pageSize => {
    setNumOfResults(pageSize);
    setPageSize(pageSize);
  };

  return (
    <div className="overflow-x-auto sm:px-6">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-5 border-b-2 border-gray-300 text-left leading-4 text-blue-600 hide-on-mobile">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 hide-on-mobile">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 hide-on-md">
                Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600">
                Amount
              </th>
              <th className="px-6 py-1 border-b-2 border-gray-300">
                <Select
                  name="numOfResults"
                  options={options}
                  value={numOfResults}
                  onChange={e => togglePageSize(e.target.value)}
                />
              </th>
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
};

export default TransactionsTable;
