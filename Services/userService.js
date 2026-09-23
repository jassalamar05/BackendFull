const User=require("../Model/UserModel")

// create 
const createUser=async(data)=>{
    return await User.create(data)
}

// read all
const getAllUser=async()=>{
    return await User.find()
}

// reasone 
const getUserById=async(id)=>{
    return await User.findById(id)
}

// Update
const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// DELETE
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};