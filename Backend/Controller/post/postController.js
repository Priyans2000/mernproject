const asyncHAndler = require("express-async-handler"); //for handling async errors in express
const post = require("../../models/post/Post.js");
const user = require("../../models/user/User.js");
const categary = require("../../model/categaryModel/categarymodel.js");

//create new post
//route post/api/v1/posts
//access private component  