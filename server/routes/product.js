import express from 'express';
import container from '../container.js';
import validateIdParam from '../validations/idValiation.js';

const router = express.Router();

router.get('/product', (req, res) => {
  container.cradle.productController.getProducts(req, res);
});
router.get('/product/:id', validateIdParam, (req, res, next) => {
  container.cradle.productController.getProduct(req, res, next);
});

export default router;
