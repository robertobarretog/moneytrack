import React from 'react';
import { Link } from 'react-router-dom';

const TransactionsSummary = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl text-center">
        Viewing 2 transactions totalling $225.45
      </h1>
      <Link to="/create">Add Transaction</Link>
    </div>
  );
};

export default TransactionsSummary;
