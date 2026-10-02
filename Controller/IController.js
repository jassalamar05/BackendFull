const { registerUser, loginUser } = require("../Services/authServices");

// ==========================
// REGISTER CONTROLLER
// ==========================

const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Basic input validation
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "name and password are required",
      });
    }

    // Service call
    await registerUser(name, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// ==========================
// LOGIN CONTROLLER
// ==========================

const LoginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Basic input validation
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "name and password are required",
      });
    }

    // Service call
    const result = await loginUser(name, password);

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      data: result.token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// ==========================
// PROTECTED ROUTE
// ==========================

const protectedRoutes = async (req, res) => {
  return res.status(200).json({
    message: "Protected user",
    success: true,
  });
};

module.exports = {
  register,
  LoginUser,
  protectedRoutes,
};
