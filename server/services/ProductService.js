import Product from '../models/ProductModel.js';

class ProductService {
  async getProducts() {
    try {
      const products = await Product.find().exec();
      if (!products) return null;
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id) {
    try {
      const product = await Product.findById(id).exec();

      if (!product) {
        const error = new Error('product not found');
        error.statusCode = 404;
        throw error;
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
