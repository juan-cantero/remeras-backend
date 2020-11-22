import express from 'express';
import container from '../container.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import validateIdParam from '../validations/idValiation.js';
const router = express.Router();

router.post('/', verifyToken, (req, res, next) => {
  container.cradle.orderController.addOrder(req, res, next);
});

router.get('/myorders', verifyToken, (req, res, next) => {
  container.cradle.orderController.getOrdersByUserId(req, res, next);
});

router.get('/:id', validateIdParam, verifyToken, (req, res, next) => {
  container.cradle.orderController.getOrderById(req, res, next);
});

router.get('/', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.orderController.getOrders(req, res, next);
});

router.put('/:id/pay', validateIdParam, verifyToken, (req, res, next) => {
  container.cradle.orderController.updateOrderToPaid(req, res, next);
});

router.put('/:id/delivered', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.orderController.updateOrderToDelivered(req, res, next);
});

export default router;
