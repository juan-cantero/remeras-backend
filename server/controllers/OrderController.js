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

  async getOrderById(req, res, next) {}

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
      res.status(201).json({ createdOrder });
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default OrderController;
