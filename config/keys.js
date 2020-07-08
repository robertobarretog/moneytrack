import dotenv from 'dotenv';
import { mongoURI as URI, secretOrKey as secret } from './keys_dev.js';

dotenv.config({ path: './config/config.env' });

let mongoURI, secretOrKey;

if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGO_URI;
  secretOrKey = process.env.SECRET_OR_KEY;
} else {
  mongoURI = URI;
  secretOrKey = secret;
}

export { mongoURI, secretOrKey };
