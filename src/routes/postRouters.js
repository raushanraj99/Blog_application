const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const router = express.Router();
const {isAuthenticated} = require("../authentication/auth")
const {createPostrouter,createPost,readingpage} = require("../controllers/PostController")


router.get("/createPost",isAuthenticated,createPostrouter)

router.post("/createPost",isAuthenticated,createPost)

router.get("/readpost",readingpage)
/

module.exports = router