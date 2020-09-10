import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import selectTransactions from '../../selectors/transactions';
import {
  setTransactions,
  removeTransaction,
} from '../../actions/transactionsActions';
import TransactionsTable from './TransactionsTable';
import Spinner from '../common/Spinner/Spinner';
import Modal from '../common/Modal/Modal';

const TransactionsList = ({
  transactions,
  pager,
  loading,
  setTransactions,
  removeTransaction,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    setTransactions();
  }, [setTransactions]);

  const onDeleteClick = id => {
    setTransactionId(id);
    setDeleting(true);
  };

  const onRemove = () => {
    setDeleting(false);
    removeTransaction(transactionId, pager.currentPage, pager.pageSize);
    setTransactionId(null);
  };

  const cancelDelete = () => {
    setDeleting(false);
    setTransactionId(null);
  };

  const output = loading ? (
    <Spinner />
  ) : (
    <>
      <div className="container mx-auto mt-5 p-3 flex justify-center items-center">
        {transactions.length === 0 ? (
          <span>No Transactions</span>
        ) : (
          <TransactionsTable
            transactions={transactions}
            pager={pager}
            getTransactions={setTransactions}
            onDeleteClick={id => onDeleteClick(id)}
          />
        )}
      </div>
      <Modal show={deleting} modalClosed={cancelDelete}>
        <h1 className="font-semibold text-xl mb-3 text-center">
          Delete Transaction
        </h1>
        <p className="text-center text-blue-600 mb-3 text-lg">
          Are you sure you want to delete this transaction?
        </p>
        <p className="text-center text-blue-600 text-lg">
          This can't be undone
        </p>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={cancelDelete}
            className="transition duration-500 ease-in-out bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg mr-3"
          >
            Cancel
          </button>
          <button
            onClick={onRemove}
            className="transition duration-500 ease-in-out bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
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

export default connect(mapStateToProps, { setTransactions, removeTransaction })(
  TransactionsList
);
