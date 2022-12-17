const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../utils/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../models/Users');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      DisplayName: user.DisplayName,
    },
    SECRET_KEY,
    { expiresIn: '2h' },
  );
};

const SALT = 12;

const UserController = {
  async login(req, res, next) {
    try {
      const { errors, valid } = validateLoginInput(
        req.body.email,
        req.body.password,
      );
      if (!valid) {
        res.locals = errors;
        return next();
      }
      const user = await User.findOne({ email: req.body.email });
      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match || !user) {
        res.locals = 'Wrong email or password';
        return next();
      }

      const token = generateToken(user);
      res.locals = {
        id: user.id,
        token,
      };
      next();
    } catch (e) {
      next({
        log: 'Error caught at GET request for User controller',
        message: e.message,
      });
    }
  },

  async register(req, res, next) {
    try {
      const { valid, errors } = validateRegisterInput(
        req.body.email,
        req.body.password,
        req.body.passwordConf,
      );
      if (!valid) {
        res.locals = errors;
        return next();
      }
      const user = await User.findOne({ email: req.body.email });
      if (user.email) {
        res.locals = 'Email is already registered';
        return next();
      }
      password = await bcrypt.hash(req.body.password, SALT);
      const newUser = new User({
        email: req.body.email,
        password,
        createdAt: new Date().toISOString(),
      });
      const tok = await newUser.save();
      const token = jwt.sign(
        {
          id: tok.id,
          email: tok.email,
        },
        SECRET_KEY,
        { expiresIn: '2h' },
      );

      res.locals = {
        id: user.id,
        token,
      };
      next();
    } catch (e) {
      next({
        log: 'Error caught at POST request for User controller',
        message: e.message,
      });
    }
  },
};

module.exports = UserController;
