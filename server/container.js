import awilix, { asClass } from 'awilix';
import OrderController from './controllers/OrderController.js';
import ProductController from './controllers/product.js';
import UserController from './controllers/UserController.js';
import OrderService from './services/OrderService.js';
import ProductService from './services/ProductService.js';
import UserService from './services/UserService.js';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  productService: asClass(ProductService).scoped(),
  productController: asClass(ProductController).scoped(),
  userService: asClass(UserService).scoped(),
  userController: asClass(UserController).scoped(),
  orderService: asClass(OrderService).scoped(),
  orderController: asClass(OrderController).scoped(),
});

export default container;
