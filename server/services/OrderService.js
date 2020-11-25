import Order from '../models/OrderModel.js';
class OrderService {
  async getOrderById(id) {
    try {
      const order = await Order.findById(id).populate('purchaserUser').exec();

      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrders() {
    try {
      return await Order.find({})
        .populate('purchaserUser', 'name email')
        .exec();
    } catch (error) {
      throw error;
    }
  }
  async createOrder(orderData) {
    const order = new Order(orderData);
    try {
      return await order.save();
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUserId(userId) {
    try {
      return await Order.find({ purchaserUser: userId });
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;
