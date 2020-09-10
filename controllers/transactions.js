import paginate from 'jw-paginate';
import asyncHandler from '../middleware/async.js';

// Validation
import validateTransactionInput from '../validation/transaction.js';

// Load Transaction & User Model
import Transaction from '../models/Transaction.js';

// @route   GET api/transactions
// @desc    Get all transactions
// @access  Private
export const getTransactions = asyncHandler(async (req, res, next) => {
  const errors = {};
  const sort = {};

  const {
    startDate = new Date(0),
    endDate = new Date(),
    sortBy = 'date',
  } = req.query;

  sort[sortBy] = -1;

  const transactions = await Transaction.find({
    user: req.user.id,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort(sort);

  if (!transactions || transactions.length === 0) {
    errors.notransactions = 'No transactions found';
    return res.status(404).json(errors);
  }

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const pager = paginate(transactions.length, page, pageSize);

  const pageOfItems = transactions.slice(pager.startIndex, pager.endIndex + 1);

  res.json({ pager, pageOfItems });
});

// @route   POST api/transactions
// @desc    Create a transaction
// @access  Private
export const createTransaction = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateTransactionInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { date, description, amount, type } = req.body;

  const newTransaction = { date, description, amount, type, user: req.user.id };

  const transaction = await new Transaction(newTransaction).save();
  res.status(201).json(transaction);
});

// @route   GET api/transactions/:id
// @desc    Get a single transaction
// @access  Private
export const getTransaction = asyncHandler(async (req, res, next) => {
  const errors = {};

  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!transaction) {
    errors.notransactions = 'No transaction exists with that id';
    return res.status(404).json(errors);
  }

  res.json(transaction);
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Private
export const deleteTransaction = asyncHandler(async (req, res, next) => {
  const errors = {};

  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!transaction) {
    errors.notransactions = 'No transaction exists with that id';
    return res.status(404).json(errors);
  }

  // Delete
  await transaction.remove();

  res.json({ success: true });
});

// @route   PUT api/transactions/:id
// @desc    Update a transaction
// @access  Private
export const updateTransaction = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateTransactionInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!transaction) {
    errors.notransactions = 'No transaction exists with that id';
    return res.status(404).json(errors);
  }

  const transactionFields = {};

  if (req.body.amount)
    transactionFields.amount = parseFloat(req.body.amount, 10) * 100;
  if (req.body.date) transactionFields.date = req.body.date;
  if (req.body.description)
    transactionFields.description = req.body.description;
  if (req.body.type) transactionFields.type = req.body.type;

  // Update
  transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id },
    { $set: transactionFields },
    { new: true }
  );

  res.json(transaction);
});
