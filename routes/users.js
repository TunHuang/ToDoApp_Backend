const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  postUser,
  getUserWithId,
  deleteUserWithId,
} = require('../controller/user-controller');

const { validUser } = require('../validations/user-validation');

router
  .route('/')
    .get(getAllUsers)
    .post(validUser, postUser)
;

router
  .route('/:id')
    .get(getUserWithId)
    // .put()
    .delete(deleteUserWithId)
;

// router
//   .route('/login')
//     .post()
// ;

module.exports = router;
