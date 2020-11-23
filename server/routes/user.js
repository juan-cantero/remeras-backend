import express from 'express';
import container from '../container.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import validateIdParam from '../validations/idValiation.js';
const router = express.Router();

router.route('/').post((req, res, next) => {
  container.cradle.userController.registerUser(req, res, next);
});

router.get('/list', verifyToken, isAdmin, (req, res, next) => {
  container.cradle.userController.getAllUsers(req, res, next);
});

router.post('/login', (req, res, next) => {
  container.cradle.userController.authUser(req, res, next);
});

router.get('/profile', verifyToken, (req, res) => {
  container.cradle.userController.getProfile(req, res);
});

router.put('/profile', verifyToken, (req, res, next) => {
  container.cradle.userController.updateUserProfile(req, res, next);
});

router.get('/:id', validateIdParam, verifyToken, isAdmin, (req, res, next) => {
  container.cradle.userController.getUserById(req, res, next);
});

router.put('/forgotpassword', (req, res, next) => {
  container.cradle.userController.forgotPassword(req, res, next);
});

router.put('/resetpassword', (req, res, next) => {
  container.cradle.userController.resetPassword(req, res, next);
});

router.put('/:id', validateIdParam, verifyToken, isAdmin, (req, res, next) => {
  container.cradle.userController.updateUser(req, res, next);
});

router.delete(
  '/:id',
  validateIdParam,
  verifyToken,
  isAdmin,
  (req, res, next) => {
    container.cradle.userController.deleteUser(req, res, next);
  }
);

export default router;
