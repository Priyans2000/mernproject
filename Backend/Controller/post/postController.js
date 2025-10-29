const asyncHAndler = require("express-async-handler"); //for handling async errors in express
const post = require("../../models/post/Post.js");
const user = require("../../models/users/user.js");
const categary = require("../../models/Categoires/Category.js");

//create new post
//route post/api/v1/posts
//access private component
const createPost = asyncHAndler(async (req, res, next) => {
  //get user from req object/ payload
  const { tittle, content, categoryId } = req.body;
  // console.log("title", tittle);
  // console.log("content", content);
  // console.log("categoryId", categoryId);
  //check if the post is present
  const postFound = await post.findOne({ tittle });
  if (postFound) {
    // return res.status(400).json({ message: "Post already exists" });
    let error = new Error("Post already exists");
    next(error);
    return;
  }
  //create new post object

  const newpost = await post.create({
    tittle: tittle,
    content: content,
    author: req.user._id,
    category: categoryId,
  });

  // upadate user by adding post in it
  const updateuser = await user.findByIdAndUpdate(
    req?.user?._id,
    { $push: { posts: newpost._id } },
    { new: true }
  );

  // upadate category by adding post in it
  const updatecategory = await categary.findByIdAndUpdate(
    categoryId,
    { $push: { posts: newpost._id } },
    { new: true }
  );

  //send response to client
  res.json({
    status: "success",
    message: "Post created successfully",
    post: newpost,
    user: updateuser,
    category: updatecategory,
  });
});
module.exports = { createPost };
