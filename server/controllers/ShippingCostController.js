import { validationResult } from 'express-validator';
import ShippingCostService from '../services/ShippingCostService.js';
import passErrorToHandler from '../utils/errors.js';

class ShippingCostController {
  /**
   *
   * @param {ShippingCostService} param0
   */
  constructor({ shippingCostService }) {
    this.shippingCost = shippingCostService;
  }

  //Describe create a new Shipping cost
  //@ROUTE POST /api/shippingCost/
  //Access PRIVATE/ADMIN
  async createShippingCost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    const { country, province, locality, postalCode, price } = req.body;

    try {
      const shippingCostData = {
        country,
        province,
        locality,
        postalCode,
        price,
      };
      const createdShippingCost = await this.shippingCost.createShippingCost(
        shippingCostData
      );
      res.status(200).json(createdShippingCost);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //Describe get all the shipping costs
  //@ROUTE get /api/shippingCost/
  //Access PRIVATE/ADMIN
  async getShippingCosts(req, res, next) {
    try {
      const shippingCosts = await this.shippingCost.getShippingCosts();
      res.status(200).json(shippingCosts);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default ShippingCostController;
