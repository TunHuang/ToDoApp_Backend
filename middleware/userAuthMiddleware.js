const createError = require('http-errors');
const User = require('../models/user-model');

module.exports = async (req, res, next) => {
  try {
    if (req.params.id == req.tokenUser.userId) {
      next();
    } else {
      const user = await User.findOne({ _id: req.tokenUser.userId });
      if (user.admin) {
        next();
      } else {
        throw 'Du darfst nur deine eigenen Daten einsehen und ändern, außer du bist Admin.';
      }
    }
  } catch (err) {
    const error = createError(401, err);
    next(error);
  }
};