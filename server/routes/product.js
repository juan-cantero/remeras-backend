import express from 'express';
import container from '../container.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import validateIdParam from '../validations/idValiation.js';

const router = express.Router();

router.get('/list', (req, res) => {
  container.cradle.productController.getProducts(req, res);
});
router.get('/:id', validateIdParam, (req, res, next) => {
  container.cradle.productController.getProduct(req, res, next);
});

router.post('/', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.productController.createProduct(req, res, next);
});

router.put('/:id', validateIdParam, verifyToken, isAdmin, (req, res, next) => {
  container.cradle.productController.updateProduct(req, res, next);
});

router.delete(
  '/:id',
  validateIdParam,
  verifyToken,
  isAdmin,
  (req, res, next) => {
    container.cradle.productController.deleteProduct(req, res, next);
  }
);

export default router;
