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
    try {
      const shippingCostData = {
        country: 'Argentina',
        province: 'Buenos Aires',
        locality: 'poner localidad',
        postalCode: 'poner codigo postal',
        price: 0,
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
  //@ROUTE get /api/shippingCost/list
  //Access PUBLIC
  async getShippingCosts(req, res, next) {
    try {
      const shippingCosts = await this.shippingCost.getShippingCosts();
      res.status(200).json(shippingCosts);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //Describe get shipping cost by id
  //@ROUTE get /api/shippingCost/:id
  //Access PRIVATE/ADMIN
  async getShippingCostById(req, res, next) {
    const id = req.params.id;
    try {
      const shippingCost = await this.shippingCost.findShippingCostById(id);
      res.status(200).json(shippingCost);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //Describe get shipping cost by locality
  //@ROUTE put /api/shippingCost/:locality
  //Access Public
  async getShippingCostByLocality(req, res, next) {
    const locality = req.params.locality;
    try {
      const shippingAdress = await this.shippingCost.findShippingCostByLocality(
        locality
      );
      res.status(200).json(shippingAdress);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //Describe update shipping cost
  //@ROUTE put /api/shippingCost/:id
  //Access PRIVATE/ADMIN
  async updateShippingCost(req, res, next) {
    const id = req.params.id;
    const { country, province, locality, postalCode, price } = req.body;

    try {
      const shippingCost = await this.shippingCost.findShippingCostById(id);
      shippingCost.country = country || shippingCost.country;
      shippingCost.locality = locality || shippingCost.locality;
      shippingCost.province = province || shippingCost.province;
      shippingCost.postalCode = postalCode || shippingCost.postalCode;
      shippingCost.price = price || shippingCost.price;
      const savedShippingCost = await shippingCost.save();
      res.status(200).json(savedShippingCost);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //Describe remove shipping cost
  //@ROUTE put /api/shippingCost/:id
  //Access PRIVATE/ADMIN
  async deleteShippingCost(req, res, next) {
    const id = req.params.id;

    try {
      const shippingCostRemoved = await this.shippingCost.removeShippingCost(
        id
      );
      res.status(200).json(shippingCostRemoved);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default ShippingCostController;
