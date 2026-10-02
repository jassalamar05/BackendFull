const authService = require("../Services/uServices");

// Reg
const Reg = async (req, res, next) => {
  // try cathc and req leti and res bhej dita
  try {
    const { name, pass } = req.body;
    // je service nei kamm krr dita then user reg succesfull
    const register = await authService.registerUser(name, pass);

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: register,
    });
  } catch (err) {
    next(err);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { name, pass } = req.body;

    const token = await authService.loginUser(name, pass);

    return res.status(200).json({
      success: true,
      message: "user login ok",
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

// protected routes
const protectedRoutes = async (req, res) => {
  return res.status(200).json({
    success: true,
    messgae: "Protected routes",
  });
};

module.exports = { Reg, loginUser, protectedRoutes };
