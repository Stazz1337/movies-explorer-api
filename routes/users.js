const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
