import products from '../data/products.js';

class ProductController {
  static getProducts(req, res) {
    res.json(products);
  }

  static getProduct(req, res) {
    const id = req.params.id;
    const product = products.find((product) => product._id === id);
    res.json(product);
  }
}

export default ProductController;
