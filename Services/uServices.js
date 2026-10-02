const bcrypt = require("bcrypt");
const userRepo = require("../Repository/user.repository");
const generateToken = require("../Utilis/generateToken");

// Register ka lgoiovc likho kyoki pehel regiuster kruga then hi login mriga
const registerUser = async (name, pass) => {
  // check existing
  // step 1: find kita existring hai ke nai
  const exist = await userRepo.findUserbyName(name);

  // hai existing tghen error thoeruy krdo
  if (exist) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  // const hashed password

  // pass word nu has kar diyta hai okay
  const hashedPass = await bcrypt.hash(pass, 10);

  // crete uyser
  const user = await userRepo.createUser({
    name,
    pass: hashedPass,
  });

  return user;
};

// login kro hun ohnu jara
const loginUser = async (name, pass) => {
  // find user
  const user = await userRepo.findUserbyName(name);

  if (!user) {
    const error = new Error("user not foung register first");
    error.statusCode = 409;
    throw error;
  }

  //compare passsword

  const isMatch = await bcrypt.compare(pass, user.pass);

  if (!isMatch) {
    const error = new Error("Invlaisd creadentials");

    error.statusCode = 409;

    throw Error;
  }

  // generate token
  const token = generateToken(user._id);

  return token;
};

module.exports = { registerUser, loginUser };
