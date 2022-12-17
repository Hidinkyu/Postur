const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/register', userController.register, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
