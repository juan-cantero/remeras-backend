import awilix, { asClass } from 'awilix';

import OrderController from './controllers/OrderController.js';
import ProductController from './controllers/ProductController.js';
import ShippingCostController from './controllers/ShippingCostController.js';
import UserController from './controllers/UserController.js';
import OrderService from './services/OrderService.js';
import ProductService from './services/ProductService.js';
import ShippingCostService from './services/ShippingCostService.js';
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
  shippingCostService: asClass(ShippingCostService).scoped(),
  shippingCostController: asClass(ShippingCostController).scoped(),
});

export default container;
