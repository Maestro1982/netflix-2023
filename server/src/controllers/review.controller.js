import responseHandler from '../handlers/response.handler.js';
import Review from '../models/review.model.js';

// Create a new review
const createReview = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new Review({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

// Remove a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notFound(res);

    await review.remove();

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Get all reviews from a user
const getAllReviewsFromUser = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
    }).sort('-createdAt');

    responseHandler.ok(res, reviews);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  createReview,
  deleteReview,
  getAllReviewsFromUser,
};
