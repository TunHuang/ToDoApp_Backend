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

const auth = require('../middleware/authMiddleware');
const user = require('../middleware/userAuthMiddleware');
const admin = require('../middleware/adminAuthMiddleware');

const {
  validUser,
  validUserUpdate
} = require('../validations/user-validation');

router
  .route('/')
    .get(auth, admin, getAllUsers)
    .post(validUser, postUser)
;

router
  .route('/:id')
    .get(auth, user, getUserWithId)
    .put(auth, user, validUserUpdate, updateUserWithId)
    .delete(auth, user, deleteUserWithId)
;

router
  .route('/login')
    .post(loginUser)
;

module.exports = router;
