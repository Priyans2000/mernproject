const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post",
    default:0
   },
     
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
