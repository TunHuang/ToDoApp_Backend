const User = require('../models/user-model');
const createError = require('http-errors');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    const error = createError(500, 'Fehler beim GET auf /users/ ' + err);
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).send(createdUser);
  } catch (err) {
    const error = createError(500, 'Fehler beim POST auf /users/sign/ ' + err);
    next(error);
  }
};

const getUserWithId = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const foundUser = await User.find({ _id });
    res.status(200).send(foundUser);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /users/ mit ID ' + err);
    next(error);
  }
};

const deleteUserWithId = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await User.deleteOne({ _id });
    res.status(200).send(result);
  } catch (err) {
    const error = createError(500, 'Fehler bei DELETE auf /users/ mit ID ' + err);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  postUser,
  getUserWithId,
  deleteUserWithId,
};