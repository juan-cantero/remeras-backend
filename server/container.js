import awilix, { asClass } from 'awilix';
import ProductController from './controllers/product.js';
import ProductService from './services/ProductService.js';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  productService: asClass(ProductService).scoped(),
  productController: asClass(ProductController).scoped(),
});

export default container;
