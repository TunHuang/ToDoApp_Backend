const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  postTaskAsAdmin,
  postTaskAsUser,
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
    .post(validTask, postTaskAsAdmin)
;

router
  .route('/:id')
    .post(validTask, postTaskAsUser)
    .put(validTaskUpdate, updateTask)
    .delete(deleteTask)
;

module.exports = router;