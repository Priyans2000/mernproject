const express = require('express');
const { registerUser, login, pview} = require("../../Controller/users/userController.js");
const isLogedin = require("../../middleware/isLogedin.js");

const router = express.Router();

//reg new ueser
router.post('/register', registerUser); 
// login new user 
router.post('/login', login); 
//profile view
router.get('/profile',isLogedin,pview);

module.exports = router