import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const mongoURI = process.env.MONGO_URI;
const secretOrKey = process.env.SECRET_OR_KEY;

export { mongoURI, secretOrKey };
