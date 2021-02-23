const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  postUser,
  getUserWithId,
  updateUserWithId,
  deleteUserWithId,
  loginUser
} = require('../controller/user-controller');

const {
  validUser,
  validUserUpdate
} = require('../validations/user-validation');

router
  .route('/')
    .get(getAllUsers)
    .post(validUser, postUser)
;

router
  .route('/:id')
    .get(getUserWithId)
    .put(validUserUpdate, updateUserWithId)
    .delete(deleteUserWithId)
;

router
  .route('/login')
    .post(loginUser)
;

module.exports = router;
