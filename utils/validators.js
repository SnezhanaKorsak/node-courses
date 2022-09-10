const {body} = require('express-validator')

const User = require('../models/user')

exports.registerValidators = [
  body('email').isEmail().withMessage('Enter the correct email')
    .custom(async  (value, {req}) => {
    try {
      const user = await User.findOne({ email: value })

      if(user) {
        return Promise.reject('A user with this email already exists')
      }
    } catch (e) {
      console.log(e)
    }
  })
    .normalizeEmail(),
  body('password', 'Password at least 6 characters')
    .isLength({min: 6, max: 20})
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Passwords don\'t match')
    }
    return true
  })
    .trim(),
  body('name')
    .isLength({min: 3, max: 10}).withMessage('Name at least 3 characters')
    .trim(),
]


exports.courseAddValidators = [
  body('title')
    .isLength({min: 3, max: 20})
    .withMessage('The title should be from 3 to 20 characters')
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Enter the correct price'),
  body('img', 'Enter the correct image url').isURL(),
]
