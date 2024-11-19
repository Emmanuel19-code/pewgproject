const express = require('express');
const { NewUserData } = require('../controller/NewUserdata');
const upload = require('../utils/multerConfig');

const router = express.Router();

router.post('/register_pewg_member', upload.single('image'), NewUserData);

module.exports = router;
