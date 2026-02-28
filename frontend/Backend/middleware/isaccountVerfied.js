const User = require("../models/users/user.js");

const isAccountverified = async (req, res, next) => {
    try {
        // check if user object exists
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // fetch user from DB
        const fetchedUser = await User.findById(req.user._id);

        if (!fetchedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // check verification (field name is lowercase: isverified)
        if (fetchedUser.isverified) {
            return next(); 
        } else {
            return res.status(401).json({
                message: "Account not verified. Please verify your account to proceed."
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = isAccountverified;
