import * as http from 'node:http';

import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import characterRouter from './routes/characters';
import { port } from './config';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/characters', characterRouter);

server.listen(port, () => {
  console.log('listening on port:', port);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('error:', err);
  res.status(500).json({ message: 'An error occured' });
});
