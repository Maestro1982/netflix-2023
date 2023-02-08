import mongoose from 'mongoose';
import modelOptions from './model.options.js';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

// Hash the password before putting it into the database
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha256')
    .toString('hex');
};

// Check if the password is correct
userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, his.salt, 1000, 64, 'sha256')
    .toString('hex');
  return this.password === hash;
};

const User = mongoose.model('User', userSchema);
export default User;
