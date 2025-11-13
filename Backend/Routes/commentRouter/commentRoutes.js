const express = require("express");

const isLoggedIn = require("../../middleware/isLogedin.js");

const { createComment , deleteComment, editcomments} = require("../../Controller/comments/Comments.js");
const commentsrouter = express.Router();

//create new comment route
commentsrouter.post("/:postid",isLoggedIn,createComment);

//route to delete comment
commentsrouter.delete("/:commentid", isLoggedIn, deleteComment)
//route to update comment
commentsrouter.put("/:commentid", isLoggedIn, editcomments);

//exporting comment router
module.exports = commentsrouter;