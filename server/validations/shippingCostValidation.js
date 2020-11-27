import { param } from 'express-validator';

const validateShippingCost = [
  param('country').notEmpty().withMessage('can not be empty'),
];

export default validateShippingCost;
