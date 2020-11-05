import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${process.env.NODE_ENV} mode running on port ${PORT}`);
});
