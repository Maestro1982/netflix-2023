import responseHandler from '../handlers/response.handler.js';
import Favorite from '../models/favorite.model.js';

// Add a new favorite
const addFavorite = async (req, res) => {
  try {
    const isFavorite = await Favorite.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new Favorite({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();
    responseHandler.created(res, favorite);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Remove a favorite
const deleteFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notFound(res);

    await favorite.remove();
    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Show all the favorites of the user
const getFavoritesFromUser = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).sort(
      '-createdAt'
    );

    responseHandler.ok(res, favorites);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  addFavorite,
  deleteFavorite,
  getFavoritesFromUser,
};
