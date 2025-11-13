const express = require("express");
const {
  registerUser,
  login,
  pview,
  blockUser,
  unblockUser,
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

module.exports = router;
