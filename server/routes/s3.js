import express from 'express';

import dotenv from 'dotenv';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import S3Controller from '../controllers/S3Controller.js';

const router = express.Router();

router.get('/upload', verifyToken, isAdmin, (req, res, next) => {
  new S3Controller().getSignedUrl(req, res, next);
});

router.delete('/:uid/:id', verifyToken, isAdmin, (req, res, next) => {
  new S3Controller().deleteImage(req, res, next);
});

router.delete('/:uid', verifyToken, isAdmin, (req, res, next) => {
  new S3Controller().deleteImageFolder(req, res, next);
});

export default router;
