const router = require('express').Router();
const routerController = require('./../controllers/auth');
const validateBody = require('./../middleware/validateBody');
const {auth} = require('./../middleware/auth');
const {User} = require('./../models/User');

router.post('/signup', validateBody(User, ['email', 'password', 'fullName']), routerController.registerUser);

router.post('/logout', auth, routerController.logout);

router.post('/login', validateBody(User, ['email', 'password']), routerController.login);

module.exports = router;
