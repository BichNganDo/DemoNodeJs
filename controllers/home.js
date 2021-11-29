const BlogPost = require('../models/BlogPost.js')
module.exports = (request, response) => {
    BlogPost.find({}, function (error, posts) {
        // console.log(request.session);
        response.render('index', {
            blogposts: posts
        })
    })
}