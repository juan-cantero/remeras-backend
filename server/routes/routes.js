import express from 'express';
import productRoutes from './product.js';
import userRoutes from './user.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use(productRoutes);

export default routes;
