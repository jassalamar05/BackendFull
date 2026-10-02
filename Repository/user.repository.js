const User = require("../Model/uModel");

// db nal jo bhi realted data hai woh ede ch auga
// find user by username
const findUserbyName = async (name) => {
  return await User.findOne({
    name: name,
  });
};

// create user
const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = { findUserbyName, createUser };
