import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import selectTransactions from '../../selectors/transactions';
import { setTransactions } from '../../actions/transactionsActions';
import TransactionsListItem from './TransactionsListItem';
import Spinner from '../common/Spinner/Spinner';

const TransactionsList = ({ transactions, loading, setTransactions }) => {
  useEffect(() => {
    setTransactions();
  }, [setTransactions]);

  const output = loading ? (
    <Spinner />
  ) : (
    <div className="container mx-auto mt-5 p-3 flex justify-center items-center">
      {transactions.length === 0 ? (
        <span>No Transactions</span>
      ) : (
        <table className="shadow-lg bg-gray-300 font-semibold text-lg">
          <thead>
            <tr>
              <th className="bg-blue-600 text-left px-8 py-4">Description</th>
              <th className="bg-blue-600 text-left px-8 py-4 hide-on-xs">
                Date
              </th>
              <th className="bg-blue-600 text-left px-8 py-4 hide-on-mobile">
                Type
              </th>
              <th className="bg-blue-600 text-left px-8 py-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <TransactionsListItem key={transaction._id} {...transaction} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return output;
};

const mapStateToProps = state => ({
  transactions: selectTransactions(
    state.transactions.transactions,
    state.filters
  ),
  loading: state.transactions.loading,
});

export default connect(mapStateToProps, { setTransactions })(TransactionsList);
