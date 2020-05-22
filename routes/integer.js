const router = require('express').Router();
const routerController = require('./../controllers/integer');
const validateBody = require('./../middleware/validateBody');
const {auth} = require('./../middleware/auth');
const {User} = require('./../models/User');

router.get('/current', auth, routerController.getCurrentInteger);

router.get('/next', auth, routerController.getNextInteger);

router.put('/current', auth, validateBody(User, ['integer']), routerController.resetCurrentInteger);

module.exports = router;
