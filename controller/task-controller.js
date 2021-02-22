const Task = require('../models/task-model');
// const createError = require('http-errors');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
  }
};

const postTask = async (req, res, next) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(201).send(createdTask);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTasks,
  postTask
};