import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose
  .connect(DB)
  .then(() => console.log('Successfully connected to DB'))
  .catch((err) => console.log(`Error connecting to DB: ${err}`));

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => console.log(`SERVER STARTED on Port ${port}`));
