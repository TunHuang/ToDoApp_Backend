const express = require('express');
const router = express.Router();
const deadlinkController = require('../controller/deadlink-controller');

router
  .route('*')
    .get(deadlinkController)
    .post(deadlinkController)
    .put(deadlinkController)
    .delete(deadlinkController)
;

module.exports = router;