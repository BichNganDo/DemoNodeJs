const { response } = require("express");
const express = require("express");
const { request } = require("http");
const { dirname } = require("path");
const app = new express();
// const path = require("path");
const ejs = require("ejs");
app.set("view engine", "ejs");

// const BlogPost = require("./models/BlogPost.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//express session
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "nganluc meo",
  })
);

//Kiểm tra dữ liệu trước khi đưa vào database
// const validateMiddleWare = (request, response, next) => {
//   if(request.files == null || !request.body.title || !request.body.body || !request.body.author){
//     return response.redirect('/posts/new');
//   }
//   next()
// }

const validateMiddleWare = require("./middleware/validationMiddleware");
app.use("/posts/store", validateMiddleWare);

//Kiểm tra sự phân quyền
const authMiddleware = require('./middleware/authMiddleware');

//Chuyển qua domain khác khi ng dùng đã login
const redirectIfAuthenticatedMiddleware = require ('./middleware/redirectIfAuthenticatedMiddleware');




//Đăng ký thư mục public
app.use(express.static("public"));

// app.get("/home", (request, response) => {
//   // response.render("index");
//   BlogPost.find({}, function (error, posts) {
//     // console.log(posts);
//     response.render("index", {
//       blogposts: posts,
//     });
//   });
// });


global.loggedIn = null; //khai báo một biến loggedIn kiểu global, mục đích là có thể truy cập biến này trong các file EJS.
app.use("*", (request, response, next) => {
  loggedIn = request.session.userId;
  next()
});


const homeController = require("./controllers/home");
app.get("/home", homeController);

app.get("/about", (request, response) => {
  // response.sendFile(path.resolve(__dirname, 'about.html'))
  response.render("about");
});

app.get("/contact", (request, response) => {
  // response.sendFile(path.resolve(__dirname, 'contact.html'))
  response.render("contact");
});

// app.get("/post/:id", (request, response) => {
//   // response.sendFile(path.resolve(__dirname, 'post.html'))
//   BlogPost.findById(request.params.id, function (error, detailPost) {
//     response.render("post", {
//       detailPost,
//     });
//   });
// });
const getPostController = require("./controllers/getPost");
app.get("/post/:id", getPostController);

// app.get("/posts/new",  (request, response) => {
//   response.render("create");
// });
const newPostController = require("./controllers/newPost");
app.get("/posts/new", authMiddleware ,newPostController);

// app.post("/posts/store", (request, response) => {
//   let image = request.files.image;
//   image.mv(
//     path.resolve(__dirname, "public/upload", image.name),
//     function (error) {
//       // model creates a new doc with browser data
//       BlogPost.create(
//         {
//           ...request.body,
//           image: "/upload/" + image.name,
//         },
//         function (error) {
//           response.redirect("/home");
//         }
//       );
//     }
//   );
// });
const storePostController = require("./controllers/storePost");
app.post("/posts/store", authMiddleware, storePostController);

// lay du lieu tu MongoDB không có điều kiện
// find()
// app.get("/", (request, response) => {
//   BlogPost.find({}, (error, posts) => {
//     console.log(posts);
//   });
// });

//register
const newUserController = require("./controllers/newUser");
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

const storeUserController = require("./controllers/storeUser");
app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

//login
const loginController = require("./controllers/login");
app.get("/auth/login",redirectIfAuthenticatedMiddleware, loginController);

const loginUserController = require("./controllers/loginUser");
const { memoryUsage } = require("process");

app.post("/users/login", redirectIfAuthenticatedMiddleware, loginUserController);

//logout
const logoutController = require('./controllers/logout');
app.get("/auth/logout", logoutController);

//not found
app.use((request, response) => response.render('notFound'));



app.listen(8000, () => {
  console.log("Port 8000");
});
