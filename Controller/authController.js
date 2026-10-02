const jwt = require("jsonwebtoken");

const User = require("../Model/ClientModel");

const {
  getGoogleTokens,
  getGoogleUser,
  findOrCreateUser,
} = require("../Services/authServices");

// ========================================
// GOOGLE LOGIN
// ========================================

const googleLogin = (req, res) => {
  const googleURL = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  res.redirect(`${googleURL}?${params.toString()}`);
};

// ========================================
// GOOGLE CALLBACK
// ========================================

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code missing",
      });
    }

    // 1. Code → Google Tokens
    const tokens = await getGoogleTokens(code);

    // 2. Access Token → Google User
    const googleUser = await getGoogleUser(tokens.access_token);

    // 3. Google User → MongoDB
    const user = await findOrCreateUser(googleUser);

    // 4. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // 5. Store JWT in Cookie
    res.cookie("app_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. Redirect frontend
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.error(
      "Google callback error:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

// ========================================
// GET CURRENT USER
// ========================================

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// LOGOUT
// ========================================

const logout = (req, res) => {
  res.clearCookie("app_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
// ========================================
// EXPORTS
// ========================================

module.exports = {
  googleLogin,
  googleCallback,
  getMe,
  logout,
};
