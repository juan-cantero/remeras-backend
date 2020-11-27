import ShippingCost from '../models/ShippingCostModel.js';

class ShippingCostService {
  async getShippingCosts() {
    try {
      return await ShippingCost.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  async createShippingCost(shippingCostData) {
    try {
      const shippingCost = new ShippingCost(shippingCostData);
      const shippingCostCreated = await ShippingCost.create(shippingCost);
      return shippingCostCreated;
    } catch (error) {
      throw error;
    }
  }

  async findShippingCostById(id) {
    try {
      return await ShippingCost.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async findShippingCostByLocality(locality) {
    try {
      return await ShippingCost.findOne({ locality });
    } catch (error) {
      throw error;
    }
  }

  async updateShippingCost(id, updateInfo) {
    try {
      const updatedShippingCost = await ShippingCost.findByIdAndUpdate(
        id,
        updateInfo
      ).exec();
      return updatedShippingCost;
    } catch (error) {
      throw error;
    }
  }

  async removeShippingCost(id) {
    try {
      return await ShippingCost.findByIdAndRemove(id).exec();
    } catch (error) {
      throw error;
    }
  }
}

export default ShippingCostService;
