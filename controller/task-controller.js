const Task = require('../models/task-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

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
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const createdTask = await Task.create(req.body);
      res.status(201).send(createdTask);
    }
  } catch (err) {
    const error = createError(500, 'Fehler beim POST auf /tasks/ ' + err);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newData = req.body;
      const _id = req.params.id;
      const updatedTask = await Task.findOneAndUpdate({ _id }, newData, { new: true });
      res.status(200).send(updatedTask);
    }
  } catch (err) {
    const error = createError(500, 'Fehler bei PUT auf /tasks/ mit ID ' + err);
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
  updateTask,
  deleteTask
};