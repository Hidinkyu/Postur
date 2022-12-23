const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../models/Users');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    SECRET_KEY,
  );
};

const SALT = 12;

const userController = {
  async register(req, res, next) {
    try {
      // TODO: check to see if username is already registered
      const checkUser = await User.findOne({ username: req.body.username });
      if (checkUser) {
        return res.status(200).json({ failed: 'Username Already Registered' });
      }
      // TODO: does password match
      if (req.body.password !== req.body.confirmPassword) {
        return res
          .status(200)
          .json({ failed: 'Messed up Confirming Password' });
      }
      // TODO: if no errors arise create a new user with an encrypted password
      const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, SALT),
      });

      // TODO: save the user info to mongo
      await newUser.save();

      // TODO: create a token for the user using the new user info
      const token = generateToken(newUser);
      res.locals = {
        id: newUser.id,
        token,
      };
      next();
      // TODO: create a catch error handler
    } catch (e) {
      next({
        log: 'Error caught registering user ' + e.message,
        message: { err: e.message },
      });
    }
  },

  async login(req, res, next) {
    try {
      // TODO: find the user from the database
      const user = await User.findOne({ username: req.body.username });
      // TODO: if there is no user registered to the username inform the user
      // TODO: check the password from the body to the decrypted passwort from the DB
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res
          .status(200)
          .json({ failed: 'Incorrect username or password' });
      }
      // TODO: if they match create a token for the user and send it through the res.locals
      const token = generateToken(user);
      res.locals = {
        id: user.id,
        token,
      };
      next();
      // TODO: create a catch error handler
    } catch (e) {
      next({
        log: 'Error caught logging user in',
        message: { err: e.message },
      });
    }
  },
};

module.exports = userController;
