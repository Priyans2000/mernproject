const express = require("express");
const { createPost , getallpost , getsinglePost , deletePost , updatePost} = require("../../Controller/post/postController.js");
const isLoggedIn = require("../../middleware/isLogedin.js");
const postrouter = express.Router();


//create new post route
postrouter.post("/", isLoggedIn, createPost);


//get all posts route
postrouter.get("/", getallpost);


//single post route
postrouter.get("/:id", getsinglePost);

//delete post route
postrouter.delete("/:id",isLoggedIn,deletePost);  
//update post route
postrouter.put("/:id",isLoggedIn, updatePost);
//exporting post router
module.exports = postrouter;
