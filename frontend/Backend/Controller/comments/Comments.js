const asyncHAndler = require("express-async-handler");
const post = require("../../models/post/Post.js");
const comment = require("../../models/comments/Comment.js");
//==================================================
//create new comment
//route post/api/v1/comments/:postid
//access private component

const createComment = asyncHAndler(async (req, res) => {
  const { msg } = req.body;
  const postId = req.params.postid;
  //create new comment object
  const newComment = await comment.create({
    msg,
    author: req?.user?._id,
    postId: postId,
  });
  //comment with post
  const updatepost = await post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true },
    { runValidators: true }
  );
  //send response to client
  res.json({
    status: "success",
    message: "Comment created successfully",
    newComment,
  });
});
//====================================================
//delete comment
//access private
//route delete/api/v1/comments/:commentid
const deleteComment = asyncHAndler(async (req, res) => {
  //to be implemented later
  const commentId = req.params.commentid;
  const del = await comment.findByIdAndDelete(commentId);

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
    del,
  });
});
//===================================================
//update comment
//access private
//route put/api/v1/comments/:commentid
const editcomments = asyncHAndler(async (req, res) => {
  const commentId = req.params.commentid;
  const { msg } = req.body;
  const upcomments = await comment.findByIdAndUpdate(
    commentId,
    { msg },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Comment updated successfully",
    upcomments,
  });
});
module.exports = { createComment, deleteComment, editcomments };
