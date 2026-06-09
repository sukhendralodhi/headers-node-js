const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/auth.controller.js')

const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;