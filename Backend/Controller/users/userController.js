//reg new ueser
const usermodel = require("../../models/users/user.js");
const tocken = require("../../config/tocken.js");
const asyncHandler = require("express-async-handler"); //for handling async errors in express
const bcrypt = require("bcryptjs");

//register new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if user already exists
  const userExists = await usermodel.findOne({ email });
  if (userExists) {
    // return res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }
  const newuser = new usermodel({ name, email, password });
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
    password: newuser?.password,
    role: newuser?.role,
  });
});

//===========================================================================
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

  //send response to client
  res.json({
    status: "success",
    email: user?.email,
    name: user?.name,
    id: user?._id,
    role: user?.role,
    token: tocken(user),
    message: "User logged in successfully",
    user,
  });
  // } catch (error) {
  //   next(error);
  // }
});

//==============================================================
//profile view
//get/api/v1/users/profile
//access private
const pview = asyncHandler(async (req, res, next) => {
  // console.log("user",req.user);fetch user data from request object
  // try{
  const userData = await usermodel.findById(req.user.id);
  res.json({ status: "success", message: "Profile view success", userData });
  // }catch(error){
  //   next(error);
  // }
});

//============================
module.exports = {
  registerUser,
  login,
  pview,
};
