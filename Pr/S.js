// // fullbakend file 

// const express=require("express")
// const dotenv=require("dotenv")
// const cors=require("cors")

// // wenv setup

// const path=require("path")
// const envFile=process.env.NODE_ENV === "production" ?
//     ".env.prod"
//     : ".env.local"


// dotenv.config({
//     path:path.resolve(process.cwd() , envFile)
// })

// console.log(process.env.NODE_ENV)
// console.log(process.env.PORT)
// // db 
// const db=require("../Db/connectDb")

// const app=express()

// db()


// app.use(cors({
//     origin:"*",
//     methods:["GET","PUT","POST","DELETE"],
//     allowedHeaders:["Content-Type","Authoriztion"]
// }))

// app.use(express.json())

// const routes=require("../Routes/apiRoutes")
// const { Server } = require("http")
// const { default: mongoose } = require("mongoose")
// app.use("/api",routes)

// // global error hablder

// app.use((err,req,res,next)=>{
//     console.log(err)

//     res.status(err.status || 500).json({
//         message:err.message || "Internal server error"
//     })
// })





// const PORT=process.env.PORT  || 5000;

// app.listen(PORT, () => {
//     console.log("port number is", PORT);
// });



// // graceful shutdown

// process.on("SIGTERM" , async() =>{
//     console.log("shudown signal")

//     //stop acceptiing renw req

//     Server.close("all req completed")

//     //close db
//     await mongoose.connection.close()
//     console.log("db is closed")

//     process.exit(0)
// })