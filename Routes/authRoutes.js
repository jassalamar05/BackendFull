const express = require("express");

const {
  googleLogin,
  googleCallback,
  getMe,
  logout,
} = require("../Controller/authController");

const authMiddleware = require("../middleware/authMiddleware");
const {
  Reg,
  loginUser,
  protectedRoutes,
} = require("../Controller/uController");

const router = express.Router();
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

router.post("/register", Reg);
router.post("/login", loginUser);
router.get("/pr", protectedRoutes);
module.exports = router;
