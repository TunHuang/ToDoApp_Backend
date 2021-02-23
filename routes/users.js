const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  postUser,
  getUserWithId,
  deleteUserWithId,
} = require('../controller/user-controller');

router
  .route('/')
    .get(getAllUsers)
    .post(postUser)
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
