const categary = require("../../models/Categoires/Category.js");
const asyncHandler = require("express-async-handler"); //for handling async errors in express
//create new categary
//route post/api/v1/categories
//access private component
const Categories = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const iscategary = await categary.findOne({ name });
  if (iscategary) {
    // return res.status(400).json({ message: "Categary already exists" });
    throw new Error("Categary already exists");
  }
  //  const newcate = new categarymodel({ name });
  //  await newcate.save();
  //  res.json({
  //     status: "success",
  //     message: "Categary created successfully",
  //     _id: newcate?._id, //optional chaining
  //     name: newcate?.name,
  //  });
  await categary.create({
    name: name,
    author: req?.user?._id,
  });
  res.json({
    status: "success ",
    message: "Categary created in successfully",
    categary,
  });
});
//===================================================
// get all categaries
//route get/api/v1/allcategories
//access public component
const getallCategories = asyncHandler(async (req, res) => {
  const allCategaries = await categary.find({}).populate({
    path : "posts",
    model :"post",
   
  });
  res.status(200).json({
    status: "success",
    message: "All categories fetched successfully",
    allCategaries,
  });
});
//========================
//delete categary by id
//single categary delete
//route delete/api/v1/categories/:id
//access private component

const deleteCategary = asyncHandler(async (req, res) => {
  const catid = req.params.id;
  const deletecat = await categary.findByIdAndDelete(catid);
  if (!deletecat) {
    res.status(404);
    throw new Error("Categary not found");
  }
  res.status(200).json({
    status: "success",
    message: "Categary deleted successfully",
    deletecat,
  });
});
//=====================================
// update categary by id
//route put/api/v1/categories/:id
//access private component

const updateCategary = asyncHandler(async (req, res) => {
  const catid = req.params.id;
  const name = req.body.name;
  const updatecat = await categary.findByIdAndUpdate(
    catid,
    { name: name },
    { new: true, runValidators: true }
  );
  if (!updatecat) {
    res.status(404);
    throw new Error("Categary not found");
  }
  res.status(200).json({
    status: "success",
    message: "Categary updated successfully",
    updatecat,
  });
});
module.exports = {
  Categories,
  getallCategories,
  deleteCategary,
  updateCategary,
};
