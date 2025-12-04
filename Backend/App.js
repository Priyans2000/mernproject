const express = require("express");
const dotenv = require("dotenv");
const {
  GlobalErrorHandler,
  notfound,
} = require("./middleware/Gerrorhandler.js");
//===================================
const userRoutes = require("./Routes/userRoute/userRoutes");
const create = require("./Routes/categaryRoutes/createcategaryRoutes.js");
const post = require("./Routes/postRoutes/postRouter.js");
const comments = require("./Routes/commentRouter/commentRoutes.js");
//===================================
// const sendMail = require("./config/sendEmail.js");
//============================
const connectdb = require("./config/db");
//=========================
// sendMail("monikaagrawal7129@gmail.com","helloworld");
//=========================
//create express app
const app = express();
//load env variables
dotenv.config();
//connection to database
connectdb();
//middleware to parse data json request body
app.use(express.json());
//======================
// routes
app.use("/api/v1/users", userRoutes);
//========================
app.use("/api/v1/categories", create);
//========================
app.use("/api/v1/posts", post);
//========================
app.use("/api/v1/comments", comments);
//========================
//404 error handler/page not found
app.use(notfound);
//====================
//setup global error handler
app.use(GlobalErrorHandler);
//======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
