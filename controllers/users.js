import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretOrKey } from '../config/keys.js';

// Import async handler to catch errors
import asyncHandler from '../middleware/async.js';

// Input validation
import validateRegisterInput from '../validation/register.js';
import validateLoginInput from '../validation/login.js';

// User Model
import User from '../models/User.js';

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user = await newUser.save();

  res.status(201).json(user);
});

// @route   POST api/users/login
// @desc    Login User / Return JWT
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }, '+password');

  // Check for user
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
  // User & Password matched

  // Create JWT Payload
  const payload = { id: user.id };

  // Sign token
  jwt.sign(payload, secretOrKey, { expiresIn: '3h' }, (err, token) => {
    res.json({ success: true, token: 'Bearer ' + token });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
export const currentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});
