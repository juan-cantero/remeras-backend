import express from 'express';
import container from '../container.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.shippingCostController.createShippingCost(req, res, next);
});

router.get('/list', (req, res, next) => {
  container.cradle.shippingCostController.getShippingCosts(req, res, next);
});

router.get('/:id', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.shippingCostController.getShippingCostById(req, res, next);
});

router.get('/:locality', (req, res, next) => {
  container.cradle.shippingCostController.getShippingCostByLocality(
    req,
    res,
    next
  );
});

router.delete('/:id', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.shippingCostController.deleteShippingCost(req, res, next);
});

router.put('/:id', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.shippingCostController.updateShippingCost(req, res, next);
});

export default router;
