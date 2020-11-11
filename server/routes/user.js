import express from 'express';
import container from '../container.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.route('/').post((req, res, next) => {
  container.cradle.userController.registerUser(req, res, next);
});

router.post('/login', (req, res, next) => {
  container.cradle.userController.authUser(req, res, next);
});

router.get('/profile', verifyToken, (req, res) => {
  container.cradle.userController.getProfile(req, res);
});

export default router;
