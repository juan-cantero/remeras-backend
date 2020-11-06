import { validationResult } from 'express-validator';
import passErrorToHandler from '../helpers/handleError.js';

class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }
  async getProducts(req, res) {
    const products = await this.productService.getProducts();

    res.json(products);
  }

  async getProduct(req, res, next) {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      const product = await this.productService.getProduct(id);

      res.status(200).json({ product });
    } catch (err) {
      passErrorToHandler(err, next);
    }
  }
}

export default ProductController;
