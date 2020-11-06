import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import colors from 'colors';

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server on ${process.env.NODE_ENV} mode running on port ${PORT}`.bgBlue.bold
  );
});
