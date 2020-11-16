import express from 'express';
import container from '../container.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', verifyToken, (req, res, next) => {
  container.cradle.orderController.addOrder(req, res, next);
});

router.get('/myorders', verifyToken, (req, res, next) => {
  container.cradle.orderController.getOrdersByUserId(req, res, next);
});

router.get('/:id', verifyToken, (req, res, next) => {
  container.cradle.orderController.getOrderById(req, res, next);
});

router.put('/:id/pay', verifyToken, (req, res, next) => {
  container.cradle.orderController.updateOrderToPaid(req, res, next);
});

export default router;
