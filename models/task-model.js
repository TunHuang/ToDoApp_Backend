const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: String
});

module.exports = mongoose.model('task', taskSchema);