import React from 'react';
import TransactionsSummary from './TransactionsSummary';
import TransactionsFilters from './TransactionsFilters';
import TransactionsList from './TransactionsList';

const TransactionsDashboard = () => {
  return (
    <>
      <TransactionsSummary />
      <TransactionsFilters />
      <TransactionsList />
    </>
  );
};

export default TransactionsDashboard;
