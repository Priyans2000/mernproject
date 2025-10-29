const express = require("express");
const { createPost } = require("../../Controller/post/postController.js");
const isLoggedIn = require("../../middleware/isLogedin.js");
const postrouter = express.Router();
//create new post route
postrouter.post("/", isLoggedIn, createPost);
module.exports = postrouter;
