import express from 'express';
import productRoutes from './product.js';

const routes = express.Router();

routes.use(productRoutes);

export default routes;
