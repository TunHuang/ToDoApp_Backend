const { check } = require('express-validator');

const validTask = [
  check('task')
    .not()
    .isEmpty()
    .withMessage('Aufgabe muss angegeben werden.')
    .trim()
    .escape(),
  check('deadline')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Deadline soll nicht leer sein.')
    .isDate()
    .withMessage('Deadline soll das Format yyyy/mm/dd (oder yyyy-mm-dd) haben'),
  check('completed')
    .not()
    .isEmpty()
    .withMessage('Completed muss angegeben werden')
    .isBoolean()
    .withMessage('Completed muss ein Boolean sein'),
  check('userId')
    .not()
    .isEmpty()
    .withMessage('User ID muss angegeben werden')
];

module.exports = {validTask};