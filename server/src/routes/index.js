import express from 'express';
import userRoute from './user.routes.js';
import mediaRoute from './media.routes.js';
import personRoute from './person.routes.js';
import reviewRoute from './review.routes.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/person', personRoute);
router.use('/reviews', reviewRoute);
router.use('/:mediaType', mediaRoute);

export default router;
