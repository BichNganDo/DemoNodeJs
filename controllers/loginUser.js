const bcrypt = require("bcrypt");
const User = require("../models/User");
module.exports = (request, response) => {
  const { username, password } = request.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          // store user session, will talk about it later
          request.session.userId = user._id
          response.redirect('/home')
        } else {
            response.redirect('/auth/login')
        }
      });
    } else {
        response.redirect('/auth/login')
    }
  });
};
