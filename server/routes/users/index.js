const login = require("./login");
const register = require("./register");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const checkResetToken = require("./checkResetToken");
const router = require("express").Router();

router.use("/login", login);
router.use("/register", register);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);
router.use("/check-reset-token", checkResetToken);

module.exports = router;
