// user model nal connect kro
const User=require("../Model/UserModel")

//adding user

const adduser=async(req,res)=>{
    try{
        //destructing bar bar likhna na pde
        const {name}=req.body

        // addng
        const adding=await User.create({
            name
        })

        res.status(200).json({
            success:true,
            message:"data added",
            data:adding
        })

    }catch(err){
        console.log(err)
        
        res.status(400).json({
            success:false,
            message:"data not added"
        })
    }
}

module.exports={adduser}