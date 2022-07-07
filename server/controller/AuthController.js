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
      password: hashedPass,
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
  console.log("req", req);
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          console.log("result,", result);
          let token = jwt.sign(
            { username: user.username },
            'secretkeyvalue',
            { expiresIn: '2h' }
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
  User.find().then(response => {
    res.json({
      response
    })
  })
  .catch(err => {
    res.json({
      message: 'An error Occured!'
    })
  })  
}

module.exports = {
  register,
  login,
  getAll
};
