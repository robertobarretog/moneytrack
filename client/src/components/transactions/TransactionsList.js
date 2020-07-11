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
    <div>
      <h1>Transactions List</h1>
      {transactions.length === 0 ? (
        <span>No Transactions</span>
      ) : (
        transactions.map(transaction => (
          <TransactionsListItem key={transaction.id} {...transaction} />
        ))
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
