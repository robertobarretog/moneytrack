import React from 'react';
import { connect } from 'react-redux';
import { editTransaction } from '../../actions/transactionsActions';
import TransactionForm from './TransactionForm';
import Button from '../common/Button';

const EditTransaction = ({ history, editTransaction, transaction }) => {
  const onGoBack = () => {
    history.push('/dashboard');
  };

  const onSubmit = updates => {
    editTransaction(transaction._id, updates, history);
  };

  return (
    <>
      <div className="container mx-auto p-3">
        <h1 className="font-bold text-xl text-center">Edit Transaction</h1>
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
    </>
  );
};

const mapStateToProps = (state, props) => ({
  transaction: state.transactions.transactions.find(
    tx => tx._id === props.match.params.id
  ),
});

export default connect(mapStateToProps, { editTransaction })(EditTransaction);
