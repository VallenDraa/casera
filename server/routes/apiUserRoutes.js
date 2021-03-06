const express = require('express');
const router = express.Router();
const { updateUser, getUser, getUserPreview } = require('../api/user');

router.use(express.json({ limit: '500kb' }));

router.put('/user/update', updateUser);
router.get('/user/get', getUser);
router.get('/user/getPreview', getUserPreview);

module.exports = router;
