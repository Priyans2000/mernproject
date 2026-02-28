const express = require("express");
const {
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
} = require("../../Controller/users/userController.js");
const isLogedin = require("../../middleware/isLogedin.js");
const { storage } = require("../../config/fileUplode.js");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage });

//reg new ueser
router.post("/register" , registerUser);// , upload.single("profilepic") demo
//====================================
// login new user
router.post("/login", login);
//====================================
//profile view
router.get("/profile", isLogedin, pview);
//====================================
// block user
router.put("/block/:useridtoBlock", isLogedin, blockUser);
//====================================
// unblock user
router.put("/unblock/:useridTOUnblock", isLogedin, unblockUser);
//====================================
//view user profile
router.get("/view-profile/:userprofileId", isLogedin, viewuaserProfile);
//====================================
//follow user
router.put("/follow-user/:userIdToFollow", isLogedin, followUser);
//====================================
//unfollow user
router.put("/unfollow-user/:userIdToUnfollow", isLogedin, unfollowUser);
//====================================
//forgot password
router.put("/forget-password", forgotPassword);
//====================================
//reset password
router.put("/reset-password/:resetToken", resetPassword);
//====================================
//account verification
router.put("/verification-email", isLogedin, verifymail);
//====================================
//account tocken verification
router.put("/account-verification/:verifyTocken", isLogedin, verifyAccount);
//====================================

module.exports = router;
