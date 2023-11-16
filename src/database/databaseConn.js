const { default: mongoose } = require("mongoose");

const DBconnect = ()=>{
   mongoose.connect(process.env.MONGODB_URI,{
   dbName:"BlogPage"
}).then((result)=>{
   console.log("Database connected")
}).catch((err)=>{
   console.log("DB connection Failed",err)
})
}
module.exports = DBconnect;