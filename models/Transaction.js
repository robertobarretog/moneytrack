import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: [true, 'Please choose a transaction type (income or expense)'],
    enum: ['income', 'expense'],
  },
});

export const Transaction = mongoose.model('transactions', TransactionSchema);
