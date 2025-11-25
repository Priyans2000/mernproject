const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    lastlogin: {
      type: Date,
      default: Date.now(),
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    accountlevel: {
      type: String,
      enum: ["free", "standard", "premium"],
      default: "free",
    },
    profilepic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    coverimg: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    bio: {
      type: String,
      default: "Update your bio",
    },
    location: {
      type: String,
      default: "Update your location",
    },
    notification: {
      emails: { type: String, required: true, default: true },
    },
    gender: {
      type: String,
      enum: ["", "male", "female", "prefer not say ", "non-binary"],
      default: "",
    },
    //  this properties are for deal with relationships
    proflieviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blockuser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likedposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    passwordresettockencode: {
      type: String,
      default: "",
    },
    passwordexpiredtockendate: {
      type: Date,
    },
    accountverificationtoken: {
      type: String,
      default: "",
    },
    accountverificationtokenexpire: {
      type: Date,
    },
  },
  // to get createdAt and updatedAt fields
  //ye properties add karna se mongoose schema me automatic createdAt and updatedAt fields add ho jate hain
  {
    timestamped: true,
  }
);
// userSchema.methods.generateVerificationToken = function () {
//   // Generate a  token
//   const verificationToken = crypto.randomBytes(20).toString("hex");
//   this.restetTocken = crypto
//     .createHash("sha256")
//     .update(verificationToken)
//     .digest("hex");
//   console.log("Generated Verification Token:", verificationToken);
//   console.log("Hashed Verification Token:", restetTocken);
//   //set the expairy time for token 10 minutes
//   this.passwordexpiredtockendate = Date.now() + 10 * 60 * 1000; //10 minutes
//   return verificationToken;
// };


userSchema.methods.generateVerificationToken = function () {
  // Generate a token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Hash the token
  this.passwordresettockencode= crypto
    .createHash("sha256")
    .update(verificationToken)   // ✅ correct variable
    .digest("hex");

  console.log("Generated Verification Token:", verificationToken);
  console.log("Hashed Verification Token:", this.passwordresettockencode);

  // Set expiry time: 10 minutes
  this.passwordexpiredtockendate = Date.now() + 10 * 60 * 1000;

  return verificationToken;
};
module.exports = mongoose.model("User", userSchema);
