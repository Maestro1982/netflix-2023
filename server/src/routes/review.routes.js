import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/review.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';

const router = express.Router({ mergeParams: true });

router.get('/', tokenMiddleware.auth, reviewController.getAllReviewsFromUser);

router.post(
  '/',
  tokenMiddleware.auth,
  body('mediaId')
    .exists()
    .withMessage('MediaId can not be empty')
    .isLength({ min: 1 }),
  body('content')
    .exists()
    .withMessage('Content can not be empty')
    .isLength({ min: 1 }),
  body('mediaType')
    .exists()
    .withMessage('Media Type is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('Media Type is invalid'),
  body('mediaTitle').exists().withMessage('Media Title is required'),
  body('mediaPoster').exists().withMessage('Media Poster is required'),
  requestHandler.validate,
  reviewController.createReview
);

router.delete(
  '/:reviewId',
  tokenMiddleware.auth,
  reviewController.deleteReview
);

export default router;
