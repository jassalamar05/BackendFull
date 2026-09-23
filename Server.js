//step 1 : Express module leke aao
const express=require("express");
// Node js ka framework hai server banane mei help krta hai 
//EXPRESS ->built in cheez nai hai balki yeh appki YEH External lib hai 

// require ka matlab hai package labo and oss nu leke aao idar wale pase
// require() =matlab hai ke Node Js ka function hai -> jo dusri file / lib ko uthata hai jaha se hamne package install kiye hai waha se


const dotenv=require("dotenv")
// Node js ka package hai jo environment variable ko load krta hai 
// isse securtity maintain hoti hai abhi .env wala aega usko study kro tab pta chaleaga kyo use krte hai
//Execute ni krta just load kruga 
// create krda hai global obj jo ham kahi se bhi use krr sakte hai project mei aappne okay

// PROCESS ENV -> Node Js mei global object hai 
// Isme system -//> SYSTEM VARIBLE AND ENV VARIABLE KO STORE KREGA AND USE KREGA FURTHER 

//Dot env run once server start ke time 
// uske badd hai time woh use kerga process.env hi okay


//env setup kasie pta lagega
const path=require("path")

const envFile=process.env.NODE_ENV ==="production"?
    ".env.production" : ".env.local";

dotenv.config({
    path:path.resolve(process.cwd() , envFile)
})

console.log(process.env.NODE_ENV)
console.log(process.env.PORT)

const connectDb=require("./Db/connectDb")
// RULE HAI 
// server se pehele db connect kro agar connect ho gya then server tak jao 




// dotenv.config()
//ENV file activate hougi

connectDb()
// database connected houga iss de nal 


const app=express();

// app= application of express
// yeh ek obejct bhi hai and fucntion bhi hai 
// express object structure hai 

// yeh system ready rduga ->
// req reciecve kruga  && repsonse send kruga && route check kruga 


const cors=require("cors");
const { default: mongoose } = require("mongoose");
// frontend and bacend connectivity ke liye 
app.use(cors({
    origin:"*",
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

// isme cors decide kruga ke server nu kon access kar sakda hai 
// CONTENT TYPE : json data
//aUTHorization : token Jwt

app.use(express.json())
// server ko incomming data (JSON) ke bare me batata hai 
// without this agar json data aya toh server = error 

// Josn() = act as middleware jo incomming json req body ko parse krke 
//  jS obj me convert krta hai aur req.body me attach taaki route handlers use krr sake

//APIS 
const routes=require("./Routes/apiRoutes")
app.use("/api",routes)


// Global Error Handler

app.use((err, req, res, next) => {

    console.error(err);

    // 1. Duplicate data
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Data already exists"
        });
    }

    // 2. Validation error 
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed"
        });
    }

    // 3. Invalid MongoDB ID 
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    // 4. Invalid JWT
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    // 5. Expired JWT
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }

    // 6. Generic / custom errors
    res.status(err.statusCode || err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});



// app.use("/auth",require("./Routes/authRoutes"))
const PORT=process.env.PORT || 5000;



const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    console.log("SIGINT received");

    // Stop accepting new requests
    server.close(async () => {
        console.log("Server closed");

        // Close MongoDB
        await mongoose.connection.close();
        console.log("Database closed");

        // Stop Node.js
        process.exit(0);
    });
});

