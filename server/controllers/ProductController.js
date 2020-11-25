import passErrorToHandler from '../utils/errors.js';
import pkg from 'express-validator';
const { validationResult } = pkg;

class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  //@description get list of products
  //@ROUTE GET /api/product/list
  //@access public
  async getProducts(req, res, next) {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword;
    const query = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : {};

    try {
      const count = await this.productService.getProductsCount(query);
      const products = await this.productService.getProducts(
        query,
        pageSize,
        page
      );

      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      passErrorToHandler(error, next);
    }
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

  //@Description get product filtered by genre
  //@route GET /api/product/list/:genre
  //@access public
  async getProductsByGenre(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const genre = req.params.genre;
    const query = genre !== '' ? { forGenre: genre } : {};

    try {
      const count = await this.productService.getProductsCount(query);
      const products = await this.productService.getProducts(
        query,
        pageSize,
        page
      );
      if (!products) {
        const error = new Error('Not products found');
        error.statusCode = 400;
        throw error;
      }
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      passErrorToHandler(error, next);
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
