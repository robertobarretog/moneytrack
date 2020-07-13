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

  const totalColor = transactionsTotal >= 0 ? 'green' : 'red';

  return (
    <div className="container mx-auto flex items-center flex-col p-3">
      <h1 className="text-center text-3xl mt-5">
        Viewing {transactionsCount} {transactionWord} totalling{' '}
        <span className={`text-${totalColor}-600`}>{formattedTotal}</span>
      </h1>
      <Link
        className="mt-5 bg-blue-600 p-3 rounded-lg text-orange-300 hover:text-orange-500 hover:bg-blue-500 transition duration-500 ease-in-out"
        to="/create"
      >
        Add Transaction
      </Link>
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
