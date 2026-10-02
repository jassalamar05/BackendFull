const Validator = (req, res, next) => {
  const { name, pass } = req.body;

  if (!name || !pass) {
    return res.status(400).json({
      success: false,
      message: "UserNmae and pass are required",
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      success: false,
      message: "username must be atleast 3 chatacter",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }
  next();
};

// =================================
// LOGIN VALIDATOR
// =================================

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }
  next();
};
module.exports = { Validator, validateLogin };
