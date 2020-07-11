// Filter income and expenses to get the amounts of each
// Return the difference

export default transactions => {
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, cur) => acc + cur.amount, 0);

  return income - expenses;
};
