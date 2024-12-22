const router = require('express').Router();

//handlers
const { loginHandler } = require('../../handlers/login');

router.post('/', loginHandler);

module.exports = router;