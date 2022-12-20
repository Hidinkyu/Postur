const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

const authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader && authHeader.split('Bearer ')[1];
    if (token) {
      try {
        jwt.verify(token, SECRET_KEY, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
        });
        return next();
      } catch (e) {
        return next({
          log: 'Invalid/Expired token',
          message: { err: e.message },
        });
      }
    }
    return res.sendStatus(401);
  }
  return res.sendStatus(401);
};

module.exports = authCheck;
