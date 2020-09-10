import React, { useState } from 'react';
import TransactionsListItem from './TransactionsListItem';
import Pagination from '../common/Pagination';
import Select from '../common/Select';

// Options for select list
const options = [
  { label: 'Show 5 results', value: 5 },
  { label: 'Show 10 results', value: 10 },
  { label: 'Show 25 results', value: 25 },
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
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-600 tracking-wider">
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
