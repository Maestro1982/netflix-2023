import responseHandler from '../handlers/response.handler.js';
import tmdbApi from '../tmdb/tmdb.api.js';

// Show the person details
const personDetails = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Show the person medias
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const media = await tmdbApi.personMedias({ personId });

    responseHandler.ok(res, media);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  personDetails,
  personMedias,
};
