//business logic

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// repo elek aao
const UserRepo = require("../Repository/User.repo");
const generateToken = require("../Utilis/generateToken");

// register
const register=async(name,email,password,)=>{
    const existingUser=await UserRepo.findUserByEmail(email)

    if(existingUser){
        const error=new Error("user already exists")
        throw error
    }

    // nai toh pass kro hash
    const hashpass=await bcrypt.hash(password,10)

    // create the user

    const createUser=await UserRepo.CreateUser({
        name,email,password:hashpass
    })

    return createUser
}

// login user
const loginUser=async(email,password)=>{
    // check kro user hega
    const exists=await UserRepo.findUserByEmail(email)

    if(!exists){
        const error=new Error("user login hi nai hega ki karda pya hai ")
        throw error;
    }

    // compare password
    const isMatch=await bcrypt.compare(password,exists.password)

    if(!isMatch){
        const error=new Error("Invalid credentials")
        throw error
    }

    // generate token
    const token=generateToken(exists._id)

    return token
}

module.exports={register,loginUser}