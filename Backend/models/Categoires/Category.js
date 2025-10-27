const mongoose = require("mongoose");
const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shares: {
      type: Number,
      default: 0,
    },
     //one category can have multiple posts so use array of object ids
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],

  //  post:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"post",
  //  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", catSchema);
