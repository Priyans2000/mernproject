// const jwt = require("jsonwebtoken");
// const tocken = (user) => {
//   const payload = {
//     user: {
//       id: user._id,
//     },
//   };
//   const token = jwt.sign(payload,process.env.JWT_SECRET, {
//     expiresIn: "3600s",
//   });
//   return token;
// };
// module.exports = tocken;


const jwt = require("jsonwebtoken");
const token = (user)=>{
if (!process.env.JWT_SECRET) {
  const err = new Error("JWT_SECRET is missing in backend .env");
  err.statusCode = 500;
  throw err;
}
const payload = {
  user:{
    id : user._id,
  }
}
const token = jwt.sign(payload,process.env.JWT_SECRET,{
  expiresIn:"7d"
})
return token;

}
module.exports = token;