import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import userModel from '../models/user.model.js';

const tokenDecode = (res) => {
  try {
    const bearerHeader = res.headers['authorization'];

    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(res);

  if (!tokenDecoded) return responseHandler.unAuthorized(res);

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return responseHandler.unAuthorized(res);

  req.user = user;

  next();
};

export default { tokenDecode, auth };
