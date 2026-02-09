//reg new ueser
const usermodel = require("../../models/users/user.js");
const sendMail = require("../../config/sendEmail.js");
const tocken = require("../../config/tocken.js");
const asyncHandler = require("express-async-handler"); //for handling async errors in express
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const sendVerificitionMail = require("../../config/accountVerificitionEmail.js");
//=========================================
//register new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if user already exists
  const userExists = await usermodel.findOne({ email });
  if (userExists) {
    // return res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }
  const newuser = new usermodel({ name, email, password, profilepic : req.file.path, });
   
  //hash password before saving to db
  const salt = await bcrypt.genSalt(8);
  newuser.password = await bcrypt.hash(password, salt);
  //save user to db
  await newuser.save();
  //send response to client
  res.json({
    status: "success",
    message: "User registered successfully",
    _id: newuser?._id, //optional chaining
    name: newuser?.name,
    email: newuser?.email,
    password: newuser?.password,//never send
    role: newuser?.role,
    profilepic: newuser?.profilepic,
  });

  res.json({
    status: "success",
    message: "File uploaded successfully",
    file: req.file,
  });
});

//=======================================
// login new user and generate jwt token
//post/api/v1/users/login
const login = asyncHandler(async (req, res, next) => {
  // try {
  const { name, password } = req.body;
  //check if user exists
  const user = await usermodel.findOne({ name });
  if (!user) {
    // return res.status(400).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
  //check if password is correct
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    // return res.status(400).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
  user.lastlogin = Date.now();
  await user.save();
  //===========================================
  const { password: userpassword, ...safeuser } = user.toObject(); //remove password from user object
  //===========================================
  //send response to client
  res.json({
    status: "success",
    email: user?.email,
    name: user?.name,
    id: user?._id,
    role: user?.role,
    token: tocken(user),
    message: "User logged in successfully",
    // user: safeuser,
  });
  // } catch (error) {
  //   next(error);
  // }
});

//=========================================
//profile view
//get/api/v1/users/profile
//access private
const pview = asyncHandler(async (req, res, next) => {
  // console.log("user",req.user);fetch user data from request object
  // try{
  const userData = await usermodel
    .findById(req.user.id)
    .select("-password")
    .populate([
      { path: "posts", modle: "post" },
      { path: "followers", modle: "user" },
      { path: "following", modle: "user" },
      { path: "blockuser", modle: "user" },
      { path: "blockuser", modle: "user" },
      { path: "proflieviews", modle: "user" },
    ]);

  if (!userData) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.json({ status: "success", message: "Profile view success", userData });
  // }catch(error){
  //   next(error);
  // }
});
//============================================
//block user
//access private/admin
//route put/api/v1/users/block/:userid
const blockUser = asyncHandler(async (req, res, next) => {
  //find user by id and update status to blocked
  const useridtoBlock = req.params.useridtoBlock;
  //user he yha nhi data base me
  const userBlock = await usermodel.findById(useridtoBlock);
  if (!userBlock) {
    let error = new Error("User not found");
    next(error);
    return;
  }
  // get the current user id
  const loginuserid = req?.user?.id;
  //check self user blocking
  //use loadash lib ys fir tostring
  if (useridtoBlock.toString() === loginuserid.toString()) {
    let error = new Error("You cannot block yourself");
    next(error);
    return;
  }
  //get the current user object from db
  const currentUser = await usermodel.findById(loginuserid);
  //! check useridBlock is already blocked or not
  if (currentUser.blockuser.includes(useridtoBlock)) {
    let error = new Error("User is blocked");
    next(error);
    return;
  }
  // push useridBlock to blockuser array
  currentUser.blockuser.push(useridtoBlock);
  await currentUser.save();
  res.json({ status: "success", message: "User blocked successfully" });
});
//===========================================
// unblock user
//access private/admin
//route put/api/v1/users/unblock/:userid
const unblockUser = asyncHandler(async (req, res, next) => {
  const useridTOUnblock = req.params.useridTOUnblock;
  const usertoUnblock = await usermodel.findById(useridTOUnblock);
  if (!usertoUnblock) {
    let error = new Error("User not found");
    next(error);
    return;
  }
  //get current login user id
  const loginUserId = req?.user?._id;
  const currentUser = await usermodel.findById(loginUserId);
  //check if user is blocked or not and is already
  if (!currentUser.blockuser.includes(useridTOUnblock)) {
    let error = new Error("User is not blocked");
    next(error);
    return;
  }

  //remove user from blockuser array

  currentUser.blockuser = currentUser.blockuser.filter((id) => {
    return id.toString() !== useridTOUnblock;
  });

  //save current user and update db
  await currentUser.save();

  res.json({ status: "success", message: "User unblocked successfully" });
});
//====================================================
// view user profile by id
//get/api/v1/users/view-profile/:userProfileid
//access private/admin
const viewuaserProfile = asyncHandler(async (req, res, next) => {
  const userprofileId = req.params.userprofileId;
  const userprofile = await usermodel.findById(userprofileId);
  if (!userprofile) {
    let error = new Error("User profile not found");
    next(error);
    return;
  }
  const currnentUserId = req?.user?._id;
  //
  if (userprofile.proflieviews.includes(currnentUserId)) {
    let error = new Error("User profile already viewed");
    next(error);
    return;
  }
  //push current user id to profileviews array
  userprofile.proflieviews.push(currnentUserId);
  await userprofile.save();
  res.json({
    status: "success",
    message: "User profile viewed successfully",
    userprofile,
  });
});
//=====================================================
// follow user
// route put/api/v1/users/follow/:userid
// access private
const followUser = asyncHandler(async (req, res, next) => {
  //get current login user id
  const currentUserId = req?.user?._id;
  //get user id to follow
  const userIdToFollow = req.params.userIdToFollow;
  const userprofile = await usermodel.findById(userIdToFollow);
  if (!userprofile) {
    let error = new Error("User not found");
    next(error);
    return;
  }
  //check self follow
  if (currentUserId.toString() === userIdToFollow.toString()) {
    let error = new Error("You cannot follow yourself");
    next(error);
    return;
  }
  //push current user id to followers array of user to follow
  await usermodel.findByIdAndUpdate(
    currentUserId,
    {
      $addToSet: { following: userIdToFollow },
    },
    { new: true },
  );
  //push user to follow to followers array of current user
  await usermodel.findByIdAndUpdate(
    userIdToFollow,
    {
      $addToSet: { followers: currentUserId },
    },
    { new: true },
  );
  res.json({ status: "success", message: "User followed successfully" });
});
//===========================================
// unfollow user
// route put/api/v1/users/unfollow/:userid
// access private
const unfollowUser = asyncHandler(async (req, res, next) => {
  //get current login user id
  const currentUserId = req?.user?._id;
  //find the user to follow
  const userIdToUnfollow = req.params.userIdToUnfollow;
  //check self unfollow
  if (currentUserId.toString() === userIdToUnfollow.toString()) {
    let error = new Error("You cannot unfollow yourself");
    next(error);
    return;
  }
  //check if user to unfollow exists
  const userProfile = await usermodel.findById(userIdToUnfollow);
  if (!userProfile) {
    let error = new Error("User not found");
    next(error);
    return;
  }
  //check if already not following
  const currentUser = await usermodel.findById(currentUserId);
  if (!currentUser.following.includes(userIdToUnfollow)) {
    let error = new Error("You are not following this user");
    next(error);
    return;
  }
  //remove userIdToUnfollow from following array of current user
  await usermodel.findByIdAndUpdate(
    currentUserId,
    {
      $pull: { following: userIdToUnfollow },
    },
    { new: true },
  );
  //remove currentUserId from followers array of userIdToUnfollow
  await usermodel.findByIdAndUpdate(
    userIdToUnfollow,
    {
      $pull: { followers: currentUserId },
    },
    { new: true },
  );
  res.json({
    status: "success",
    message: "User unfollowed successfully",
  });
});
//=========================================
//forgot password
//route post/api/v1/users/forget-password
//access public
const forgotPassword = asyncHandler(async (req, res, next) => {
  //get email
  const { email } = req.body;
  //check if user exists
  const user = await usermodel.findOne({ email });
  if (!user) {
    return next(new Error("User with this email does not exist"));
  }
  //generate password reset token
  const resetToken = await user.generatePasswordResetToken();
  await user.save();
  sendMail(email, resetToken);
  res.json({
    status: "success",
    message: "Password reset email sent to your email address",
  });
});
//===============================================
//reset password
//route post/api/v1/users/reset-password/:resetToken
//access public
const resetPassword = asyncHandler(async (req, res, next) => {
  //get the tocken from params
  const resetToken = req.params.resetToken;
  const { password } = req.body;
  //hash the tocken
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //find the tocken with the db
  const user = await usermodel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // if user not found
  if (!user) {
    return next(new Error("Invalid or expired password reset token"));
  }
  //update the new password
  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(password, salt);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json({
    status: "success",
    message: "Password reset successfully",
  });
});
//============================================
//accont verification email
//route post/api/v1/users/verification-email
//access private
const verifymail = asyncHandler(async (req, res, next) => {
  //get current user
  const currentUserId = req?.user?._id;
  // const currentUserId = await usermodel.findById(req.user.id);
  //check if user exists
  const user = await usermodel.findById(currentUserId);
  if (!user) {
    return next(new Error("User not found"));
  }
  //get the tocken from current user object
  const verifyToken = await user.generateaccountVerificationToken();
  await user.save();
  sendVerificitionMail(user.email, verifyToken);
  res.json({
    status: "success",
    message: "Account verification email sent to your email address",
  });
});
//============================================
// verify account
//route put/api/v1/users/verify-account/:verifyToken
//access private
const verifyAccount = asyncHandler(async (req, res, next) => {
  const { verifyTocken } = req.params;
  //hash the tocken
  const hashedToken = crypto
    .createHash("sha256")
    .update(verifyTocken)
    .digest("hex");
  //find the tocken with the db
  const user = await usermodel.findOne({
    accountverificationtoken: hashedToken,
    accountverificationtokenexpire: { $gt: Date.now() },
  });
  // if user not found
  if (!user) {
    return next(new Error("Invalid or expired account verification token"));
  }
  //update the new password
  user.isverified = true;
  user.accountverificationtoken = undefined;
  user.accountverificationtokenexpire = undefined;
  await user.save();
  res.json({
    status: "success",
    message: "Account verified successfully",
  });
});
//============================
module.exports = {
  registerUser,
  login,
  pview,
  blockUser,
  unblockUser,
  viewuaserProfile,
  followUser,
  unfollowUser,
  forgotPassword,
  resetPassword,
  verifymail,
  verifyAccount,
};
