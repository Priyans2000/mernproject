const express = require("express");
const dotenv = require("dotenv");
const {
  GlobalErrorHandler,notfound,} = require("./middleware/Gerrorhandler.js");
//===================================
const userRoutes = require("./Routes/userRoute/userRoutes");
const create = require("./Routes/categaryRoutes/createcategaryRoutes.js");
//============================
const connectdb = require("./config/db");
//====================================
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
app.use("/api/users/v1", userRoutes);
//========================
app.use("/api/v1/categories", create);
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
