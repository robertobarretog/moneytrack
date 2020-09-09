import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const mongoURI =
  process.env.NODE_ENV == 'development'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI;
const secretOrKey = process.env.SECRET_OR_KEY;

export { mongoURI, secretOrKey };
