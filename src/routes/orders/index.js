import { Router } from 'express';
import AuthGuard from '@middlewares/authenticate';
import Validator from '@middlewares/validator';
import Controller from './orders.controller';

const router = Router();

/* List of orders */
router.get('/orders', AuthGuard.verifyToken, Controller.getOrders());

/* List of pending orders */
router.get('/orders/pending', AuthGuard.verifyToken, Controller.getPendingOrders());

/* Get a specific order */
router.get(
  '/orders/:id',
  AuthGuard.verifyToken,
  Validator.validate('idParam'),
  Controller.getOrder()
);

/* Place an order */
router.post('/orders', AuthGuard.verifyToken, Controller.placeOrder());

/* Cancel an order */
router.post(
  '/orders/:id/cancel',
  AuthGuard.verifyToken,
  Controller.cancelOrder()
);

/* Pay an order */
router.post(
  '/orders/:id/pay',
  AuthGuard.verifyToken,
  Controller.payOrder()
);

/* Update a specific order */
router.patch(
  '/orders/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.updateOrder()
);

export default router;
