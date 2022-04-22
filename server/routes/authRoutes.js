const express = require('express');
const router = express.Router();
const { register, login } = require('../auth/auth');

// allow json
router.use(express.json());

// user auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;
