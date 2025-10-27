const express = require("express");
const { Categories, getallCategories , deleteCategary, updateCategary}=require("../../Controller/categories/catecontrollers.js")
const isLogedin = require("../../middleware/isLogedin.js");
const categoriesRouter = express.Router();

//reg new ueser
categoriesRouter.post("/", isLogedin , Categories );
//get all categaries
categoriesRouter.get("/", getallCategories);
//delete categary by id 
categoriesRouter.delete("/:id", isLogedin , deleteCategary);
//update categary by id
categoriesRouter.put("/:id", isLogedin , updateCategary);
module.exports =  categoriesRouter;
   
