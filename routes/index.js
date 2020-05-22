const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/integer', require('./integer'));

module.exports = router;
