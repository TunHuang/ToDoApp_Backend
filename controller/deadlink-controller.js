const createError = require('http-errors');

const deadlinkController = (req, res, next) => {
  let error = createError(404, 'Diesen Pfad gibt es nicht.');
  next(error);
};

module.exports = deadlinkController;