module.exports = (request, response, next) => {
  if (
    request.files == null ||
    !request.body.title ||
    !request.body.body ||
    !request.body.author 
  ) {
    return response.redirect("/posts/new");
  }
  next();
};
