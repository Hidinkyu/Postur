const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const userController = require('../controller/userController');

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

router.use(allowCrossDomain);

router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/register', userController.register, (req, res) => {
  res.status(200).json(res.locals.token);
});

router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.token);
});

module.exports = router;
