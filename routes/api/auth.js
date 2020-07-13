import express from 'express';
import { forgotPassword, resetPassword } from '../../controllers/auth.js';

const router = express.Router();

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
