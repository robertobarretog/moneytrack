import express from 'express';
import passport from 'passport';
import { registerUser, login, currentUser } from '../../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  currentUser
);

export default router;
