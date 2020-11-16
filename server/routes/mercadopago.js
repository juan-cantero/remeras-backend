import express from 'express';
import MercadoPagoController from '../controllers/MercadoPagoController.js';

const router = express.Router();

router.post('/mercadopago', (req, res, next) => {
  new MercadoPagoController().mercadopagoRequest(req, res, next);
});

router.post('./mercadopago', (req, res, next) => {
  new MercadoPagoController().notificationPaymentReceived(req, res, next);
});

export default router;
