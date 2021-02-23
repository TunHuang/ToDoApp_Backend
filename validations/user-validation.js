const { check } = require('express-validator');

const validUser = [
  check('firstName')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Vorname muss angegeben werden')
    .trim()
    .escape(),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('Nachname muss angegeben werden')
    .trim()
    .escape(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('E-Mail muss angegeben werden')
    .trim()
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig')
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Passwort muss angegeben werden')
    .isStrongPassword()
    .withMessage('Passwort ist nicht sicher. Es soll mindestens acht Zeichen enthalten, davon mindestens eine Kleinbuchstabe, mindestens eine Großbuchstabe, mindestens eine Nummer und mindestens ein Sonderzeichen')
    .trim(),
  check('admin')
    .optional()
    .isBoolean()
];

module.exports = {validUser};