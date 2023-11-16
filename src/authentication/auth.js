const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.redirect("login");
    } else {
      const decoded = jwt.verify(token, "specialdatatestingpurpose");
      // console.log("Decoded valule ;:: ",decoded)
      // console.log("req ::::: value ;;;;   ",req)
      req.user = await User.findById(decoded._id);

      next();
    }
  } catch (error) {
   console.log("Is Authentication Error")
  }
};

module.exports = { isAuthenticated };
