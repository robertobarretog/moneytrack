import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   currentUser
// );

export default router;
