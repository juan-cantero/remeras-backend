import express from 'express';
import container from '../container.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', verifyToken, (req, res, next) => {
  container.cradle.orderController.addOrder(req, res, next);
});

router.get('/:id', verifyToken, (req, res, next) => {
  container.cradle.orderController.getOrderById(req, res, next);
});

export default router;
