module.exports = (request, response) => {
  if (request.session.userId) {// điều kiện này có nghĩa là session có chứa user id hay không?
    return response.render("create");
  }
  response.redirect('auth/login');
};
