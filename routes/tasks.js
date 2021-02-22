const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  postTask
} = require('../controller/task-controller');

router
  .route('/')
    .get(getAllTasks)
    .post(postTask)
;

// router
//   .route('/:id')
//     .put()
//     .delete()
// ;

module.exports = router;