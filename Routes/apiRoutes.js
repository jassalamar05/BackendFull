const express=require("express")

const router=express.Router()


const { adduser } = require("../Controller/UserController")

router.post("/adduser",adduser)

module.exports=router