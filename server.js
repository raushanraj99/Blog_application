
const app = require("./app")
const DBconnect = require("./src/database/databaseConn")
DBconnect()



app.listen(process.env.PORT,()=>{
   console.log(`Server is working fine on ${process.env.PORT}`) 
})