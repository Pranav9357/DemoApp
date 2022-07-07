const User = require("../database/model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      username: req.body.username,
      password: hashedPass
    });

    user
      .save()
      .then((user) => {
        res.json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error occured!",
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: { username: username } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
          );
          res.json({
            message: "Login Successfully!",
            token,
          });
        } else {
          res.json({
            message: "Password does not matched!",
          });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  });
};

const getAll = (req, res) => {
  
}

module.exports = {
  register,
  login,
};
