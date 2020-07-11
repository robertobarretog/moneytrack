import React from 'react';
import { connect } from 'react-redux';
import selectTransactions from '../../selectors/transactions';
import TransactionsListItem from './TransactionsListItem';

const TransactionsList = ({ transactions }) => {
  return (
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
};

const mapStateToProps = state => ({
  transactions: selectTransactions(state.transactions, state.filters),
});

export default connect(mapStateToProps)(TransactionsList);
