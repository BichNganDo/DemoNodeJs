const BlogPost = require("../models/BlogPost.js");
module.exports = (request, response) => {
  BlogPost.findById(request.params.id, function (error, detailPost) {
    response.render("post", {
      detailPost,
    });
  });
};
