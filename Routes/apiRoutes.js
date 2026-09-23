const express=require("express")

const router=express.Router()

const { createUser, getAll, getId, updateUser, deleteUser } = require("../Controller/UserController")

router.post("/createUser",createUser)
router.get("/getall",getAll)
router.get("/getone/:id",getId)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
module.exports=router

// function apiRoutes(req, res) {

//     if (req.method === "POST" && req.url === "/users") {

//         let body = "";

//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", () => {

//             console.log(body);

//             res.end("Data received");
//         });
//     }
// }

// module.exports = apiRoutes;