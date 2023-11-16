const express = require("express");
const router = express.Router();

const { registrationForm, registerUser,login,logout,userLogin,userProfile } = require("../controllers/user");

/////// Authentication 
const {isAuthenticated} = require("../authentication/auth")



// user registration

router.get("/register", registrationForm);
router.post("/register", registerUser);

router.get("/login", login);
router.post("/login",userLogin)

router.get("/logout",logout)

router.get("/profile",isAuthenticated,userProfile);


module.exports = router;









