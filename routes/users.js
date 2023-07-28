const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validations');

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
