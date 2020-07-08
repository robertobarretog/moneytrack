import express from 'express';
import passport from 'passport';

import {
  getTransactions,
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} from '../../controllers/transactions.js';

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createTransaction)
  .get(passport.authenticate('jwt', { session: false }), getTransactions);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), getTransaction)
  .put(passport.authenticate('jwt', { session: false }), updateTransaction)
  .delete(passport.authenticate('jwt', { session: false }), deleteTransaction);

export default router;
