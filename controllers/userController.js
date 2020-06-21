require("dotenv").config();
const User = require("../models/user"),
  jwt = require("jsonwebtoken"),
  password = require("password-hash"),
  helper = require("../utils/helper");

/**
 * Login Controller
 */
let login = function (req, res) {
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
        password: "value is undefined",
      },
    });
  // Creating hash
  let hashPassword = password.generate(req.body.Password);

  let user = new User({
    Id: helper.generateUniqueString("usrid"),
    Name: req.body.Name,
    Email: req.body.Email,
    is_Admin: req.body.is_Admin,
    Password: hashPassword,
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!helper.ValidateEmail(user.Email)) {
        res.status(403).send("Invalid email address");
      }
      if (user.Password == "" || user.Name == "") {
        res.status(403).send("Please insert username and password!");
      } else {
        res.send(user.Id);
      }
      // res.redirect("/user");
    }
  });
};

module.exports = {
  login,
  signUp,
};
