import express from 'express';
import container from '../container.js';
import productValidations from '../validations/productValidation.js';

const router = express.Router();

router.get('/product', (req, res) => {
  container.cradle.productController.getProducts(req, res);
});
router.get('/product/:id', productValidations, (req, res, next) => {
  container.cradle.productController.getProduct(req, res, next);
});

export default router;
