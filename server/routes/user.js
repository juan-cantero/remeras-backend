import express from 'express';
import container from '../container.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
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

export default router;
