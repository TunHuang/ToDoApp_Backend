var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware');
const corsMiddleware = require('./middleware/corsMiddleware');

// Routes
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const deadlinkRouter = require('./routes/deadlink');

var app = express();

const uri = process.env.MONGO ?? 'mongodb://localhost:27017/todo';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

let db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => console.log('Mit Datenbank verbunden'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware zum Erlauben von CORS
app.use(corsMiddleware);

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// Route um 404 abzufangen und als Fehler auszugeben
app.use('*', deadlinkRouter);

// Fehler-Middleware
app.use(errorMiddleware);

module.exports = app;
