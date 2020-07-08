import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

// Convert amount to cents before storing it
TransactionSchema.pre('save', async function (next) {
  if (!this.isModified('amount')) {
    next();
  }

  this.amount = parseFloat(this.amount, 10) * 100;
  next();
});

export default mongoose.model('transactions', TransactionSchema);
