const jwt = require('jsonwebtoken');
const User = require('../Database/schema/Userschema');
const auth = async (req, response, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'demo');
    await User.find({email: decoded.email}).then((data) => {
      if (data) {
        next();
      } else {
        response.json({
          status: 401,
          message: 'invalid token!',
        });
      }
    }).catch((err) => {
      res.json({
        stauts: 400,
        message: err,
      });
    });
  } catch (error) {
    response.json({
      status: 401,
      message: 'Unauthorized',
    });
  }
};

module.exports = {auth};
