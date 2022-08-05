import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

export const mongoURI = env.get('MONGO_URI').required().asString();
export const port = env.get('PORT').required().asPortNumber();
