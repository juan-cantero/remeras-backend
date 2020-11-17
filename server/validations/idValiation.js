import { param } from 'express-validator';
import mongoose from 'mongoose';
const validateIdParam = [
  param('id')
    .notEmpty()
    .custom((id) => {
      return mongoose.isValidObjectId(id);
    })
    .withMessage('invalid id'),
];

export default validateIdParam;
