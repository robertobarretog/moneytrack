import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectTransactions from '../../selectors/transactions';
import selectTransactionsTotal from '../../selectors/transactions-total';

const TransactionsSummary = ({ transactionsCount, transactionsTotal }) => {
  const transactionWord =
    transactionsCount === 1 ? 'transaction' : 'transactions';
  const formattedTotal = numeral(transactionsTotal / 100).format('$0,0.00');

  return (
    <div className="container mx-auto">
      <h1 className="text-xl text-center">
        Viewing {transactionsCount} {transactionWord} totalling {formattedTotal}
      </h1>
      <Link to="/create">Add Transaction</Link>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleTransactions = selectTransactions(
    state.transactions.transactions,
    state.filters
  );

  return {
    transactionsCount: visibleTransactions.length,
    transactionsTotal: selectTransactionsTotal(visibleTransactions),
  };
};

export default connect(mapStateToProps)(TransactionsSummary);
