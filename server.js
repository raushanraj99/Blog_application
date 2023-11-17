
const app = require("./app")
const DBconnect = require("./src/database/databaseConn")
DBconnect()



app.listen(process.env.PORT || 8000,()=>{
   console.log(`Server is working fine on ${process.env.PORT}`) 
})