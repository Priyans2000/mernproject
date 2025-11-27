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
} = require("../../Controller/users/userController.js");
const isLogedin = require("../../middleware/isLogedin.js");

const router = express.Router();

//reg new ueser
router.post("/register", registerUser);
// login new user
router.post("/login", login);
//profile view
router.get("/profile", isLogedin, pview);
// block user
router.put("/block/:useridtoBlock", isLogedin, blockUser);
// unblock user
router.put("/unblock/:useridTOUnblock", isLogedin, unblockUser);
//view user profile
router.get("/view-profile/:userprofileId", isLogedin, viewuaserProfile);
//follow user
router.put("/follow-user/:userIdToFollow", isLogedin, followUser);
//unfollow user
router.put("/unfollow-user/:userIdToUnfollow", isLogedin, unfollowUser);

//forgot password
router.post("/forget-password", forgotPassword);
module.exports = router;
