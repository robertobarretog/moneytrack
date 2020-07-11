import moment from 'moment';

// Get visible transactions

export default (transactions, { text, sortBy, startDate, endDate }) => {
  return transactions
    .filter(transaction => {
      const createdAtMoment = moment(transaction.date);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = transaction.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.date < b.date ? 1 : -1;
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
      if (sortBy === 'type') {
        return a.type < b.type ? 1 : -1;
      }
      return a.description < b.description ? 1 : -1;
    });
};
