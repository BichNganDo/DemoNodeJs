"use strict";
var util = require("util");
const utf8Encoder = new util.TextEncoder();
const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true });

const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/test_my_database", {
  useNewUrlParser: true,
});

//creat 1 BlogPost
// BlogPost.create({
//     title: 'Đây là sách dạy học lập trình Node.js từ cơ bản',
//     body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.'
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })

//lay du lieu tu MongoDB không có điều kiện
//find()
// BlogPost.find({}, (error, blogspot) => {
//   console.log(error, blogspot);
// });

//lay du lieu tu MongoDB có điều kiện
// BlogPost.find(
//   {
//     title: "Đây là sách dạy học lập trình Node.js từ cơ bản",
//   },
//   (error, blogspot) => {
//     console.log(error, blogspot);
//   }
// );

// BlogPost.find(
//   {
//     title: "Node.js",
//   },
//   (error, blogspot) => {
//     console.log(error, blogspot);
//   }
// );

//update document
// var id = "61a0aaef4e206cbb0b0e5e29";
// BlogPost.findByIdAndUpdate(
//   id,
//   {
//     title: "Updated title",
//   },
//   (error, blogspot) => {
//     console.log(error, blogspot);
//   }
// );

//Delete 1 document
var id = "61a0aaef4e206cbb0b0e5e29";
BlogPost.findByIdAndDelete(id, (error, blogspot) => {
  console.log(error, blogspot);
});
