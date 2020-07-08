import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import passport from 'passport';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';

// Route files
import users from './routes/api/users.js';
import transactions from './routes/api/transactions.js';

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Initialize database connection
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
import passportConfig from './config/passport.js';
passportConfig(passport);

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
});

app.use('/api/', limiter);

// Mount routers
app.use('/api/users', users);
app.use('/api/transactions', transactions);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
