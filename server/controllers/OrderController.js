import pkg from 'express-validator';
const { validationResult } = pkg;
import OrderService from '../services/OrderService.js';
import passErrorToHandler from '../utils/errors.js';

class OrderController {
  /**
   *
   * @param {OrderService} orderService
   */
  constructor({ orderService }) {
    this.orderService = orderService;
  }

  //@describe get order by id
  //@route GET /api/orders/:id
  //@access PRIVATE
  async getOrderById(req, res, next) {
    const orderId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const orderDb = await this.orderService.getOrderById(orderId);
      if (!orderDb) {
        const error = new Error('order not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(orderDb);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@describe get all the orders
  //@route GET /api/orders
  //@access PRIVATE/ADMIN
  async getOrders(req, res, next) {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@describe add order
  //@route POST /api/orders
  //@access PRIVATE
  async addOrder(req, res, next) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      const error = new Error('No order items');
      error.statusCode = 400;
      throw error;
    }

    const orderData = {
      orderItems,
      purchaserUser: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    };
    try {
      const createdOrder = await this.orderService.createOrder(orderData);
      res.status(201).json(createdOrder);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@describe update order payment
  //@PUT /api/orders/:id/pay
  //@access private
  async updateOrderToPaid(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
      }
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@describe update order payment
  //@PUT /api/orders/:id/delivered
  //@access PRIVATE/ADMIN
  async updateOrderToDelivered(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
      }
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description get the orders for a user
  //@route GET api/orders/myorder
  //@access PRIVATE
  async getOrdersByUserId(req, res, next) {
    const userId = req.user._id;

    try {
      const myOrders = await this.orderService.getOrdersByUserId(userId);
      res.status(200).json(myOrders);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default OrderController;
