const Task = require('../models/task-model');
const createError = require('http-errors');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    const error = createError(500, 'Fehler beim GET auf /tasks/ ' + err);
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(201).send(createdTask);
  } catch (err) {
    const error = createError(500, 'Fehler beim POST auf /tasks/ ' + err);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await Task.deleteOne({ _id });
    res.status(200).send(result);
  } catch (err) {
    const error = createError(500, 'Fehler beim DELETE auf /tasks/:id ' + err);
    next(error);
  }
};

module.exports = {
  getAllTasks,
  postTask,
  deleteTask
};