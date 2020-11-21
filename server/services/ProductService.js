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

  async createProduct(productInfo) {
    try {
      const product = new Product(productInfo);
      return await product.save();
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, productUpdate) {
    try {
      const product = await Product.findById(id);

      product.name = productUpdate.name;
      product.image = productUpdate.image;
      product.description = productUpdate.description;
      product.category = productUpdate.category;
      product.stock = productUpdate.stock;
      product.forGenre = productUpdate.forGenre;
      product.unit_price = productUpdate.unit_price;

      const productSaved = await product.save();
      return productSaved;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndRemove(id).exec();
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProductsForUser(id) {
    try {
      const deletedProducts = await Product.deleteMany({ creator: id }).exec();
      return deletedProducts;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
