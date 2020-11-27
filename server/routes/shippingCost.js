import express from 'express';
import container from '../container.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  container.cradle.shippingCostController.createShippingCost(req, res, next);
});

router.get('/', (req, res, next) => {
  container.cradle.shippingCostController.getShippingCosts(req, res, next);
});

export default router;
