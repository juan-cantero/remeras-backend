import express from 'express';
import productRoutes from './product.js';
import userRoutes from './user.js';
import orderRoutes from './orders.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use(productRoutes);
routes.use('/orders', orderRoutes);

export default routes;
