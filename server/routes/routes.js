import express from 'express';
import productRoutes from './product.js';
import userRoutes from './user.js';
import orderRoutes from './orders.js';
import mercadoPagoRoutes from './mercadopago.js';
import s3Routes from './s3.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/product', productRoutes);
routes.use('/orders', orderRoutes);
routes.use('/s3', s3Routes);
routes.use(mercadoPagoRoutes);

export default routes;
