const corsMiddleware = (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
  next();
};

module.exports = corsMiddleware;