import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
import passErrorToHandler from '../utils/errors.js';
import OrderService from '../services/OrderService.js';
import Axios from 'axios';
import Order from '../models/OrderModel.js';
dotenv.config();
mercadopago.configure({
  access_token: process.env.MP_DEV_TOKEN,
});

const front_url =
  process.env.NODE_ENV === 'development'
    ? 'http:localhost:3000'
    : process.env.FRONT_URL;

const orderService = new OrderService();

class MercadoPagoController {
  async mercadopagoRequest(req, res, next) {
    const items = req.body.items;
    const order_id = req.body.external_reference;
    let preference = {
      items: items,
      external_reference: order_id,
      auto_return: 'approved',
      notification_url: 'https://r-emeras.herokuapp.com/api/notification',
      back_urls: {
        failure: `${front_url}/failure`,
        success: `${front_url}/success`,
      },
      payment_methods: {
        excluded_payment_types: [
          {
            id: 'ticket',
          },
        ],
        installments: 12,
      },
    };
    try {
      const response = await mercadopago.preferences.create(preference);
      res.json(response);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description receive marcadopago notification of payment
  //@route POST /api/notification
  //@access public
  async notificationPaymentReceived(req, res, next) {
    const id = req.query.id;
    const topic = req.query.topic;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_DEV_TOKEN}`,
      },
    };
    try {
      const { data } = await Axios.get(
        `https://api.mercadopago.com/v1/payments/${id}`,
        config
      );
      if (data) {
        const { external_reference, date_approved } = data;
        const info = await MailService.sendmail({
          from: 'juan.cantero@outlook.com',
          to: 'juanqui.cantero1989@gmail.com',
          subject: 'Ingresa en el link para resetear tu password',
          html: `
          <h1>El pago fue hecho correctamente</h1>
          <p>${date_approved}</p>
        `,
        });
        const order = await Order.findById(external_reference);
        order.isPaid = true;
        order.paidAt = date_approved;
        await order.save();
      }
      res.status(200).send('ok');
    } catch (error) {
      passErrorToHandler(error, next);
    }

    res.status(200);
  }
}

export default MercadoPagoController;
