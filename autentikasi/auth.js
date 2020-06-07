require("dotenv").config();
var jwt = require("jsonwebtoken");

let loginAuth = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.SECRETKEYS, function(err, decoded) {
    if (decoded) {
      next();
    } else {
      res.send(err);
    }
  });
};

module.exports = {
  loginAuth
};