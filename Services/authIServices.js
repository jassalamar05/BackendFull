const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const IUser = require("../Model/IModel");

const register = async (name, email, password) => {
  // hcek use

  const existingUser = await IUser.findOne({
    name,
  });

  if (existing) {
    const error = new Error("user already exists");

    error.statusCode = 409;
    throw error;
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  const Iuser = await IUser.create({
    name,
    password: hashPass,
  });
  return Iuser;
};

/// login serviece

let loginUser = async (name, passwrd) => {
  // 1. Find user
  const user = await IUser.findOne({
    username,
  });

  if (!user) {
    const error = new Error("Invalid username or password");

    error.statusCode = 401;

    throw error;
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid username or password");

    error.statusCode = 401;

    throw error;
  }

  // 3. Generate JWT
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  loginUser,
};
