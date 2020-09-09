import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import selectTransactions from '../../selectors/transactions';
import { setTransactions } from '../../actions/transactionsActions';
import TransactionsTable from './TransactionsTable';
import Spinner from '../common/Spinner/Spinner';

const TransactionsList = ({
  transactions,
  pager,
  loading,
  setTransactions,
}) => {
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
        <TransactionsTable
          transactions={transactions}
          pager={pager}
          getTransactions={setTransactions}
        />
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
  pager: state.transactions.pager,
  loading: state.transactions.loading,
});

export default connect(mapStateToProps, { setTransactions })(TransactionsList);
