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
const payload = {
  user:{
    id : user._id,
  }
}
const token = jwt.sign(payload,process.env.JWT_SECRET,{
  expiresIn:"3600s"
})
return token;

}
module.exports = token;