const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const {
  validateUserBody,
  validateAuth,
} = require('../middlewares/validations');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateUserBody, login);

router.post('/signup', validateAuth, createUser);

router.use(auth);

router.use(userRoutes);

router.use(movieRoutes);

router.use('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = router;
