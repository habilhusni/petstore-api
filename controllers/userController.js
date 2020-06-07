require("dotenv").config();
const User = require("../models/user"),
      jwt = require("jsonwebtoken"),
      password = require("password-hash");

/**
 * Login Controller
 */
let login = function(req, res) {
  User.findOne({ Name: req.body.Name }).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else if (!user) {
      res.status(400).send("cannot find Name");
    } else {
      if (!password.verify(req.body.Password, user.Password)) {
        res.status(400).send("password is wrong");
      } else {
        var token = jwt.sign(
          { Name: user.Name, is_Admin: user.is_Admin, Id: user.Id },
          process.env.SECRETKEYS,
          { expiresIn: "1d" }
        );
        res.send(token);
      }
      // res.send(user);
    }
  });
};

/**
 * Signup Controller
 */
let signUp = (req, res) => {
  if (!req.body.Password)
    res.send({
      errors: {
        password: "value is undefined"
      }
    });
  // Creating hash
  let hashPassword = password.generate(req.body.Password);

  let user = new User({
    Id: req.body.Id,
    Name: req.body.Name,
    Email: req.body.Email,
    is_Admin: req.body.is_Admin,
    Password: hashPassword
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (user.Password == "" || user.Name == "") {
        res.send("Please insert username and password!");
      } else {
        res.send(user);
      }
      // res.redirect("/user");
    }
  });
};

module.exports = {
  login,
  signUp,
}
