const express = require('express');
const router = express.Router();
const { updateUser } = require('../api/user');

router.use(express.json({ limit: '500kb' }));

router.put('/user/update', updateUser);

module.exports = router;
