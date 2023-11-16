const User = require("../models/user");
const Blogpost = require("../models/post");

// All postings
// get request of create post page
const createPostrouter = (req, res) => {
  res.render("createPost");
};

// post requerstof create post page.
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // console.log("this is requrest of user : ",req.user);
    const blogpost = await Blogpost.create({
      title,
      description,
      user: req.user,
    });
    // console.log("blogpost User id : ",blogpost)
    const user = await User.findOneAndUpdate(
      {
        _id: blogpost.user,
      },
      {
        $push: {
          blogs: blogpost._id,
        },
      }
    );
    // find all Blogs 
    const allBlogs =await Blogpost.find()
    // console.log("User wala : : ",allBlogs)

    res.render("index",{
      allPost:allBlogs
    })
  } catch (error) {
    console.log("Post Creation Error ");
  }
};

const readingpage =async (req,res)=>{
   const {id} = req.query;
   
   const postInfo = await Blogpost.findById(id)

   res.render("readpost",{
      postInfo:postInfo
   })
}




module.exports = { createPostrouter, createPost ,readingpage};
