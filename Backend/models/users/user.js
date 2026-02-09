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
      required: true,
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

    passwordResetToken: {
      type: String,
      default: "",
    },

    passwordexpiredtockentime: {
      type: Date,
    },

    passwordResetExpires: {
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// -------------------- METHODS --------------------

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//================================
userSchema.methods.generateaccountVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.accountverificationtoken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.accountverificationtokenexpire = Date.now() + 10 * 60 * 1000;

  return verificationToken;
};
//================================
module.exports = mongoose.model("User", userSchema);
