import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  editTransaction,
  removeTransaction,
} from '../../actions/transactionsActions';
import TransactionForm from './TransactionForm';
import Button from '../common/Button';
import Modal from '../common/Modal/Modal';

const EditTransaction = ({
  history,
  editTransaction,
  transaction,
  removeTransaction,
}) => {
  const [deleting, setDeleting] = useState(false);

  const onGoBack = () => {
    history.push('/dashboard');
  };

  const onSubmit = updates => {
    editTransaction(transaction._id, updates, history);
  };

  const onRemove = () => {
    setDeleting(false);
    removeTransaction(transaction._id, history);
  };

  const onDeleteClick = () => {
    setDeleting(true);
  };

  const cancelDelete = () => {
    setDeleting(false);
  };

  return (
    <>
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
      <div className="container mx-auto p-3">
        <h1 className="font-bold text-3xl text-center">Edit Transaction</h1>
      </div>
      <div className="text-center">
        <Button
          value="Go Back"
          bgColor="blue"
          txtColor="orange"
          onClick={onGoBack}
        />
      </div>
      <div className="container mx-auto p-3">
        <TransactionForm onSubmit={onSubmit} transaction={transaction} />
      </div>
      <div className="text-center mt-4 mb-2">
        <button
          className="transition duration-500 ease-in-out bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          onClick={onDeleteClick}
        >
          Delete Transaction
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  transaction: state.transactions.transactions.find(
    tx => tx._id === props.match.params.id
  ),
});

export default connect(mapStateToProps, { editTransaction, removeTransaction })(
  EditTransaction
);
