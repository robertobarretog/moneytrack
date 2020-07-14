import crypto from 'crypto';

// Utility function to send an email
import sendEmail from '../utils/sendEmail.js';

// Import async handler to catch errors
import asyncHandler from '../middleware/async.js';

// Input validation
import validateForgotPassword from '../validation/forgot-password.js';
import validateResetPassword from '../validation/reset-password.js';

// User Model
import User from '../models/User.js';

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateForgotPassword(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) requested the reset of a password.\n\nVisit the following URL to proceed:\n\n${resetUrl} \n\nThis URL is valid for 30 minutes.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({
      success: true,
      data: 'A URL was sent to reset your password. Check your email.',
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    errors.email = 'Email could not be sent';

    await user.save({ validateBeforeSave: false });

    return res.status(500).json(errors);
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateResetPassword(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    errors.token = 'Invalid or expired Token. Please request a new one.';
    return res.status(400).json(errors);
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    data: 'Password reset successfully, you can log in with your new password.',
  });
});
