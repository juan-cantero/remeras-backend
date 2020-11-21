import { validationResult } from 'express-validator';
import passErrorToHandler from '../utils/errors.js';

class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  //@description get list of products
  //@ROUTE GET /api/product/list
  //@access public
  async getProducts(req, res) {
    const products = await this.productService.getProducts();

    res.json(products);
  }

  //@description get a product
  //@ROUTE GET /api/product/:id
  //@access public
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

  //@description create product
  //@ROUTE  POST /api/product/
  //@access PRIVATE/ADMIN
  async createProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const productInfo = {
      creator: req.user._id,
      name: 'remera1',
      image: '/images/remera1.jpeg',
      description: 'una remera',
      category: 'remeras',
      stock: {
        xs: 10,
        s: 10,
        m: 10,
        l: 10,
        xl: 10,
      },

      forGenre: 'mujer',
      unit_price: 1000,
    };

    try {
      const createdProduct = await this.productService.createProduct(
        productInfo
      );
      res.status(201).json(createdProduct);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description update product
  //@ROUTE  PUT /api/product/:id
  //@access PRIVATE/ADMIN
  async updateProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const {
      name,
      image,
      description,
      category,
      stock,
      forGenre,
      unit_price,
    } = req.body;
    const productUpdates = {
      name,
      image,
      description,
      category,
      stock,
      forGenre,
      unit_price,
    };
    try {
      const updatedProduct = await this.productService.updateProduct(
        req.params.id,
        productUpdates
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description delete product
  //@ROUTE  DELETE /api/product/:id
  //@access PRIVATE/ADMIN
  async deleteProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = req.params.id;

    try {
      const deletedUser = await this.productService.deleteProduct(id);
      return res
        .status(200)
        .json({ message: 'product deleted successfully', deletedUser });
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description delete products by user id
  //@ROUTE  DELETE /api/product/list/:uid
  //@access PRIVATE/ADMIN
  async deleteAllProductsForUser(req, res, next) {
    const uid = req.params.uid;

    try {
      const deletedProducts = await this.productService.deleteAllProductsForUser(
        uid
      );
      res
        .status(200)
        .json({ message: 'products deleted successfuly', deletedProducts });
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default ProductController;
