const User=require("../Model/UserModel")

function findUserByEmail(email){
    return User.findOne({email})
}

//create 
function CreateUser(data){
    return User.create(data)
}


//Email ka kaam:
// 👉 Login ke waqt user ko identify karke password verify karna.
// ID ka kaam:
// 👉 Login ke baad authenticated user ko identify karna.

function findUserById(id){
    return User.findById(id).select("-password")
}

module.exports={findUserByEmail,CreateUser,findUserById}