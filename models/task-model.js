const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: String,
  deadline: Date,
  completed: Boolean,
  userId: String
});

module.exports = mongoose.model('task', taskSchema);