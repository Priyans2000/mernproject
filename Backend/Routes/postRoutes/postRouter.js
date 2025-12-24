const express = require("express");
const {
  createPost,
  getallpost,
  getsinglePost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
  clapPost,
  schedulePost
} = require("../../Controller/post/postController.js");

const isLoggedIn = require("../../middleware/isLogedin.js");

const isAccountverified = require("../../middleware/isaccountVerfied.js");

const postrouter = express.Router();
//==============================================================================================
//create new post route
postrouter.post("/", isLoggedIn, isAccountverified, createPost);

//get all posts route
postrouter.get("/", getallpost);

//like post route (must be before /:id route to avoid conflict)
postrouter.put("/like/:id", isLoggedIn, likePost);

//dislike post route
postrouter.put("/dislike/:id", isLoggedIn, dislikePost);

//single post route
postrouter.get("/:id", getsinglePost);

//delete post route
postrouter.delete("/:id", isLoggedIn, deletePost);

//update post route
postrouter.put("/:id", isLoggedIn, updatePost);

//clap post router
postrouter.put("/clap/:id", isLoggedIn, clapPost);

//schedule post route
postrouter.put("/schedule/:id", isLoggedIn, schedulePost);
//==============================================================================================


//exporting post router
module.exports = postrouter;
