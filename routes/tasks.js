const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  postTask,
  updateTask,
  deleteTask
} = require('../controller/task-controller');

const {
  validTask,
  validTaskUpdate
} = require('../validations/task-validation');

router
  .route('/')
    .get(getAllTasks)
    .post(validTask, postTask)
;

router
  .route('/:id')
    .put(validTaskUpdate, updateTask)
    .delete(deleteTask)
;

module.exports = router;