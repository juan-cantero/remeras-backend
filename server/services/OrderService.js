import Order from '../models/OrderModel.js';
class OrderService {
  async createOrder(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }
}

export default OrderService;
