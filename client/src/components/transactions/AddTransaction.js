import React from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../../actions/transactionsActions';
import TransactionForm from './TransactionForm';
import Button from '../common/Button';

const AddTransaction = ({ history, addTransaction }) => {
  const onGoBack = () => {
    history.push('/dashboard');
  };

  const onSubmit = transaction => {
    addTransaction(transaction, history);
  };

  return (
    <>
      <div className="container mx-auto p-3">
        <h1 className="font-bold text-xl text-center">Add Transaction</h1>
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
        <TransactionForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default connect(null, { addTransaction })(AddTransaction);
