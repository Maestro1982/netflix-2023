import User from '../models/user.model.js';
import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

// Register a new user
const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    // Check if the user is already in the database
    const checkUser = await User.findOne({ username });

    if (checkUser)
      return responseHandler.badRequest(res, 'User already in the database');

    const user = new User();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

// Login user
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select(
      'username password salt id displayName'
    );

    if (!user) return responseHandler.badRequest(res, 'User does not exist');

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, 'Invalid password');

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

// Change password
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('password, id, salt');

    if (!user) return responseHandler.unAuthorized(res);

    if (!user.validatePassword(password))
      return responseHandler.badRequest(res, 'Invalid password');

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

// Get user information
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return responseHandler.notFound(res);

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  updatePassword,
  getUserInfo,
};
