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
    image: req.file.path,
  });
  // upadate user by adding post in it
  const updateuser = await user.findByIdAndUpdate(
    req?.user?._id,
    { $push: { posts: newpost._id } },
    { new: true },
  );

  // upadate category by adding post in it
  const updatecategory = await categary.findByIdAndUpdate(
    categoryId,
    { $push: { posts: newpost._id } },
    { new: true },
  );

  //send response to client
  res.json({
    status: "success",
    message: "Post created successfully",
    post: newpost,
    user: updateuser,
    category: updatecategory,
  });
  // console.log("File received:", req.file);
  res.json({
    status: "success",
    message: "File uploaded successfully",
    file: req.file,
  });
});

//================================================
// get all posts
//route get/api/v1/allposts
//access public component
const getallpost = asyncHAndler(async (req, res) => {
  // const allpost = await post.find({}).populate("author").populate("category");
  const currentUserId = req.user._id;
  // get all users those blocked current user
  const userBlockCurrentUser = await user.find({
    blockuser: currentUserId,
  });
  //extract the id of the user who have blocked current user
  const blockUserIds = userBlockCurrentUser.map((userObj) => userObj._id);
  const query = {
    author: { $nin: blockUserIds },
    $or: [{ scheduledpost: { $lte: new Date() }, schedulePost: null }],
  };
  // fetch those post whose author is not blocking blockUserIds
  const allpost = await post.find(query).populate({
    path: "author",
    model: "User",
    select: "email name role isblocked isverified ",
  });
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
//=================================================
// like post by id
//route put/api/v1/posts/like/:id
//access private component

const likePost = asyncHAndler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  const foundPost = await post.findById(postId);
  if (!foundPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  const updatedPost = await post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    message: "Post liked successfully",
    post: updatedPost,
  });
});
//=================================================
// post dislike by id
//route put/api/v1/posts/dislike/:id
//access private component
const dislikePost = asyncHAndler(async (req, res) => {
  const postId = req.params.id; // ✅ MATCH ROUTE
  const userId = req.user._id;

  const foundPost = await post.findById(postId);
  if (!foundPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  const updatedPost = await post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    message: "Post disliked successfully",
    post: updatedPost,
  });
});
//============================================
//post clap by id
//route put/api/v1/posts/clap/:id
//access private component
const clapPost = asyncHAndler(async (req, res) => {
  const postId = req.params.id;

  const foundPost = await post.findById(postId);
  if (!foundPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  const updatedPost = await post.findByIdAndUpdate(
    postId,
    { $inc: { clap: 1 } },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    message: "Post clapped successfully",
    post: updatedPost,
  });
});
//============================================
//schedule post
//route put/api/v1/post/schedule/:id
// access private
const schedulePost = asyncHAndler(async (req, res, next) => {
  const postId = req.params.id;
  const { scheduledpost } = req.body;

  if (!scheduledpost || !postId) {
    return next(new Error("Post not found"));
  }

  // find post
  const foundPost = await post.findById(postId);
  if (!foundPost) {
    return next(new Error("Post not found"));
  }

  // author check
  if (foundPost.author.toString() !== req.user._id.toString()) {
    return next(new Error("You are not authorized to schedule this post"));
  }

  // date check
  const schedualedDate = new Date(scheduledpost);
  if (schedualedDate <= new Date()) {
    return next(new Error("Scheduled date must be in the future"));
  }

  // schedule post in db
  await post.findByIdAndUpdate(
    postId,
    {
      scheduledpost: schedualedDate,
      $unset: { category: "" }, // remove category association
    },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    message: "Post scheduled successfully",
  });
});

//============================================

module.exports = {
  createPost,
  getallpost,
  getsinglePost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
  clapPost,
  schedulePost,
};
