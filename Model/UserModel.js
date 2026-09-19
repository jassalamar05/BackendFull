//mongoose nal connect kro 
const mongoose=require("mongoose")

// mongoose schema bana do in db
const UserSchma=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        minLength:[2,"min name"]
    }
},{
    timestamps:true
}
)

// this maakes table and connect with the controller

const User=mongoose.model("user",UserSchma)
module.exports=User

