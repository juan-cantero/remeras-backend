import { param } from 'express-validator';
import mongoose from 'mongoose';
const productValidation = [
  param('id')
    .custom((id) => {
      return mongoose.isValidObjectId(id);
    })
    .withMessage('invalid id'),
];

export default productValidation;
