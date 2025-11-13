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

//================================================
// get all posts
//route get/api/v1/allposts
//access public component
const getallpost = asyncHAndler(async (req, res) => {
  const allpost = await post.find({}).populate("author").populate("category");
  //send response to client
  res.json({
    status: "success",
    message: "all posts fetched successfully",
    allpost,
  });
});
//===============================================
// get single post by id
//route get/api/v1/posts/:id
//access public component
const getsinglePost = asyncHAndler(async (req, res) => {
  const postId = req.params.id;
  //fetch post by id
  const fetchedpost = await post
    .findById(postId)
    .populate("author")
    .populate("category");
  if (!fetchedpost) {
    res.json({
      status: "success",
      message: " post not fetched ",
    });
  } else {
    res.json({
      status: "success",
      message: "post fetched successfully",
      fetchedpost,
    });
  }
});

//================================================
// delete post by id
//route delete/api/v1/posts/:id
//access private component

const deletePost = asyncHAndler(async (req, res) => {
  const postId = req.params.id;
  //delete post by id and db
  const delPost = await post.findByIdAndDelete(postId);
  res.json({
    status: "success",
    message: "Post deleted successfully",
  });
  // if(delpost){
  //   res.status(404);
  //   throw new Error("Post not found");
  // }else{
  //   res.json({
  //     status: "success",
  //     message: "Post deleted successfully",
  //     delPost,
  //   });
  // }
});
//================================================
//update post by id
//route put/api/v1/posts/:id
//access private component

const updatePost = asyncHAndler(async (req, res) => {
  const postId = req.params.id;
  const upost = req.body;
  const udpost = await post.findByIdAndUpdate(postId, upost, {
    new: true,
    runValidators: true,
  });
  if (!udpost) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    res.json({
      status: "success",
      message: "Post updated successfully",
      udpost,
    });
  }
});

module.exports = {
  createPost,
  getallpost,
  getsinglePost,
  deletePost,
  updatePost,
};
