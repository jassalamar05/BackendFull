const userService = require("../Services/userService");

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(200).json({
      success: true,
      message: "data added",
      data: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// getall
const getAll = async (req, res, next) => {
  try {
    const user = await userService.getAllUser();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// read ONE

const getId = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// update user

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// delete

const deleteUser =async(req,res,next)=>{
    try{
        const user= await userService.deleteUser(req.params.id)

   res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { createUser, getAll, getId ,updateUser ,deleteUser};
