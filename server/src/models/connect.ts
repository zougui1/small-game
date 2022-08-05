import mongoose from 'mongoose';

import { mongoURI } from '../config';

export const connect = (): void => {
  mongoose.connect(mongoURI);
}
