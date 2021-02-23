const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  postTask,
  deleteTask
} = require('../controller/task-controller');

const { validTask } = require('../validations/task-validation');

router
  .route('/')
    .get(getAllTasks)
    .post(validTask, postTask)
;

router
  .route('/:id')
    // .put()
    .delete(deleteTask)
;

module.exports = router;