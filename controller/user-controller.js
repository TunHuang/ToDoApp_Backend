const User = require('../models/user-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newUser = req.body;
      const existedUser = await User.findOne({ email: newUser.email });
      console.log(existedUser);
      if (existedUser) {
        const error = createError(409, 'Es gibt bereits einen Nutzer mit der Email-Adresse.');
        next(error);
      } else {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const createdUser = await User.create({ ...newUser, password: hashedPassword});
        res.status(201).send(createdUser);
      }
    }
  } catch (err) {
    const error = createError(500, 'Fehler beim POST auf /users/ ' + err);
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

const updateUserWithId = async (req, res, next) => {
  try {
    const newData = req.body;
    const _id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const existedUser = await User.findOne({ email: newData.email });
      if (existedUser) {
        const error = createError(409, 'Es gibt bereits einen Nutzer mit der Email-Adresse.');
        next(error);
      } else if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 10);
        const updatedUser = await User.findOneAndUpdate({ _id }, { ...newData, password: hashedPassword }, { new: true });
        res.status(200).send(updatedUser);
      } else {
        const updatedUser = await User.findOneAndUpdate({ _id }, newData, { new: true });
        res.status(200).send(updatedUser);
      }
    }
  } catch (err) {
    const error = createError(500, 'Fehler bei PUT auf /users/ mit ID ' + err);
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

const loginUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const userFromDb = await User.findOne({ email: userData.email });
    if (!userFromDb) {
      const error = createError(401, 'Einloggen fehlgeschlagen. ' + err);
      next(error);
    } else {
      const passwordComparison = await bcrypt.compare(userData.password, userFromDb.password);
      if (!passwordComparison) {
        const error = createError(401, 'Einloggen fehlgeschlagen. ' + err);
        next(error);
      } else {
        const token = jwt.sign({
          email: userFromDb.email,
          userId: userFromDb._id
        }, process.env.JWT ?? 'Geheimnis', { expiresIn: '1h' });
        res.status(200).json({
          nachricht: 'Du bist eingeloggt',
          userId: userFromDb._id,
          token: token
        });
      }
    }
  } catch (err) {
    const error = createError(401, 'Einloggen fehlgeschlagen. ' + err);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  postUser,
  getUserWithId,
  updateUserWithId,
  deleteUserWithId,
  loginUser
};