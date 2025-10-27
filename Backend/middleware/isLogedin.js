const jwt = require("jsonwebtoken");
const user = require("../models/users/user.js");
const isLogedin = (req, res, next) => {
  console.log("isLogedin middleware called");
  //fetch token from header
  const tocken = req.headers.authorization?.split(" ")[1];
  // console.log("token", tocken);
  // console.log("request", req.headers.authorization)
  //console.log("request", req) for request object
  //===============================
  //verifay token

  jwt.verify(tocken, process.env.JWT_SECRET, async (err, decoded) => {
    // console.log("decoded",decoded)
    // console.log("err",err)
    //if fail , then send error response
    if (err) {
      const error  = new Error(err?.message);
      next(error);
      // return res.status(401).json({ status: "failed", message: err?.message });
    } else {
      //if success , then call next()
      const userid = decoded?.user?.id;
      const userData = await user
        .findById(userid)
        .select("name ,email ,role , _id");
      //   console.log("user", userData);//fetch user data from database
      req.user = userData; //attach user data to request object for further use
      next();
    }
  });
  //===================
};
module.exports = isLogedin;
