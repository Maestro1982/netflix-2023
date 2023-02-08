import responseHandler from '../handlers/response.handler.js';
import tmdbApi from '../tmdb/tmdb.api.js';
import User from '../models/user.model.js';
import Favorite from '../models/favorite.model.js';
import Review from '../models/review.model.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

// Get a list of a certain media type and category
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Get all the genres
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Search for a specific movie, serie or actor
const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === 'people' ? 'person' : mediaType,
      query,
      page,
    });
    responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Get the details
const getDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;

    const recommendations = await tmdbApi.mediaRecommend(params);
    media.recommendations = recommendations.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await User.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await Favorite.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await Review.findOne({ mediaId })
      .populate('user')
      .sort('-createdAt');

    responseHandler.ok(res, media);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  getList,
  getGenres,
  search,
  getDetails,
};
