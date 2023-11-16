const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Blogpost = require("../models/post");




const registrationForm = (req, res) => {
  res.render("register")
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user =await User.findOne({email})
    
    const hashedPassword = await bcrypt.hash(password,10)
    
    if(!user){
      await User.create({
      name,
      email,
      password:hashedPassword,
      });
     return res.redirect("login")
    }
    else{
      res.render('login',{
        success:"Email Already exists "
      })
    }

    res.redirect("login");
  } catch (error) {
    console.log("Registration Failed ", error);
    res.redirect("register");

  }
};

// get requrest login page 
const login = (req,res)=>{
  res.render("login")
}
// post req login 
const userLogin= async (req,res)=>{
    try {
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(!user) return res.render("login",{
        success:" * Email Does not Exists, Register first"
      })
      
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) return res.render("login",{
        success:"Password doesn't match"
      })
      // res.redirect("/")

      // jsonwebtoken
   
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

      res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+15*60*10000)
      }).redirect("/")

    } catch (error) {
      console.log("Logging in error ");
      res.render("login")

    }
}

const logout =(req,res)=>{
  try {
    res.clearCookie("token").redirect("/login")
  } catch (error) {
    console.log("logout Error ")
    res.render("index")
  }
}

// user Profile 
const userProfile =async (req,res)=>{
  try {

   let userInfo = req.user;
  //  console.log(userInfo.blogs[1].toString())
   var data = [];
   for(let i = 0 ;i<userInfo.blogs.length;i++){
    data.push(await Blogpost.findById(userInfo.blogs[i]));
   }
  //  console.log("All Data :: ",data)
  //  console.log("size : ",sizeofdata)

 
    res.render("profile",{
      userData:userInfo,
      blogsData:data,
      NoOfPost:data.length
    })
    
  } catch (error) {
    console.log("User Profile serve error ",error)
  }


}


 


module.exports = { registrationForm, registerUser,login,logout,userLogin ,userProfile};
