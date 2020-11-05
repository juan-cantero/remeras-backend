import express from 'express';
import ProductController from '../controllers/product.js';
const router = express.Router();

router.get('/product', ProductController.getProducts);
router.get('/product/:id', ProductController.getProduct);
export default router;
