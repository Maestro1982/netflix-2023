import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favorite.controller.js';
import userController from '../controllers/user.controller.js';
import requestHandler from '../handlers/request.handler.js';
import User from '../models/user.model.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router();

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters long')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });

      if (user) return Promise.reject('Username already exists');
    }),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('confirmPassword')
    .exists()
    .withMessage('Confirm Password is required')
    .isLength({ min: 8 })
    .withMessage('Confirm Password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('ConfirmPassword does not match');
      return true;
    }),
  body('displayName')
    .exists()
    .withMessage('DisplayName is required')
    .isLength({ min: 8 })
    .withMessage('DisplayName must be at least 8 characters long'),
  requestHandler.validate,
  userController.signup
);

router.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 8 })
    .withMessage('Username minimum 8 characters'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password minimum 8 characters'),
  requestHandler.validate,
  userController.signin
);

router.put(
  '/update-password',
  tokenMiddleware.auth,
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .exists()
    .withMessage('NewPassword is required')
    .isLength({ min: 8 })
    .withMessage('New Password must be at least 8 characters long'),
  body('confirmNewPassword')
    .exists()
    .withMessage('Confirm New Password is required')
    .isLength({ min: 8 })
    .withMessage('Confirm New Password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error('Confirm New Password does not match');
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get('/info', tokenMiddleware.auth, userController.getUserInfo);

router.get(
  '/favorites',
  tokenMiddleware.auth,
  favoriteController.getFavoritesFromUser
);

router.post(
  '/favorites',
  tokenMiddleware.auth,
  body('mediaType')
    .exists()
    .withMessage('Media Type is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('Media Type is invalid'),
  body('mediaId')
    .exists()
    .withMessage('MediaId is required')
    .isLength({ min: 1 })
    .withMessage('MediaId can not be empty'),
  body('mediaTitle').exists().withMessage('Media Title is required'),
  body('mediaPoster').exists().withMessage('Media Poster is required'),
  body('mediaRate').exists().withMessage('Media Rate is required'),
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  '/favorites/:favoriteId',
  tokenMiddleware.auth,
  favoriteController.deleteFavorite
);

export default router;
