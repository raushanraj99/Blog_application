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





// delete post get method....
const deletePost = async (req, res) => {
  try {

    let queryParams=req._parsedOriginalUrl.query
    if(!queryParams){
      return res.status(401).json({message:"No Query Params Found"})
      }else{
        const BlogModel = await Blogpost.findOne({_id:queryParams})

        let userId = BlogModel.user.toString()
        const userInfo =await User.findById(userId)


        if (userInfo.blogs.length == 0){
          blogsData=0
          res.redirect("index")
        }else{

        for(let i =0;i<userInfo.blogs.length;i++){

            if(userInfo.blogs[i].toString() == BlogModel._id.toString()){

              await userInfo.blogs.pull(userInfo.blogs[i])
              await userInfo.save()  
            }
        }
        await BlogModel.deleteOne()
        console.log("blog model post also deleted ")



        res.redirect("profile")

      }

      }

  } catch (err) {
      console.log("Deleting post with admin list error : ",err)
    }

  };







module.exports = { createPostrouter, createPost ,readingpage,deletePost};
