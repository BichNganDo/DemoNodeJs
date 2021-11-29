module.exports = (request, response, next) => {
    // console.log("AAAAAAA");
    // console.log(request);
    if(request.session.userId) { //điều kiện này có nghĩa là session có chứa user id hay không? Nếu có thì đã login rồi.
        return response.redirect('/home')
    }
    next()
}