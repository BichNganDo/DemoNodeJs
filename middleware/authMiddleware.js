const User = require("../models/User");
module.exports = (request, response, next) => {
  User.findById(request.session.userId, (error, user) => {
    if (error || !user) {
      return response.redirect("/home");
    }
    next()
  });
};
