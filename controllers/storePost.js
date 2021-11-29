const BlogPost = require("../models/BlogPost.js");
const path = require("path");
module.exports = (request, response) => {
  let image = request.files.image;
  image.mv(
    path.resolve(__dirname, "..", "/public/upload", image.name),
    function (error) {
      BlogPost.create(
        {
          ...request.body,
          image: "/upload/" + image.name,
        },
        function (err) {
          response.redirect("/home");
        }
      );
    }
  );
};
