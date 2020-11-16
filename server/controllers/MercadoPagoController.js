import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
import passErrorToHandler from '../utils/errors.js';
dotenv.config();
mercadopago.configure({
  access_token: process.env.MP_DEV_TOKEN,
});

class MercadoPagoController {
  async mercadopagoRequest(req, res, next) {
    const items = req.body.items;
    const order_id = req.body.external_reference;
    let preference = {
      items: items,
      external_reference: order_id,
      auto_return: 'approved',
      // notification_url: 'http://192.168.0.104:3000/notification',
      marketplace: 'Remeras',
      back_urls: {
        failure: 'http://192.168.0.104:3000/failure',
        pending: 'http://192.168.0.104:3000/pending',
        success: 'http://192.168.0.104:3000/success',
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
  //@route POST /api/mercadopago/notification
  //@access public
  async notificationPaymentReceived(req, res, next) {
    const id = req.query.id;
    const topic = req.query.topic;
    console.log(id);
    res.status(200).json({ id, topic });
  }
}

export default MercadoPagoController;
