const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");
const passwordResetSchema = require(
  "../../database/models/passwordResetSchema",
);
const cipherGuard = require("cipher-guard");

router.post("/", async (req, res) => {
  const { userId, resetToken, password } = req.body;
  const hashedPassword = cipherGuard.encrypt(password, process.env.CIPHER_GUARD_KEY, process.env.CIPHER_GUARD_SALT);
  const reset = await passwordResetSchema.findOne({
    userId: userId,
    resetToken: resetToken,
  });

  if (!reset) {
    return res.json({ message: "Invalid or expired reset token", status: 400 });
  }

  const now = new Date();
  if (now > reset.expiresAt) {
    return res.json({ message: "Invalid or expired reset token", status: 400 });
  }

  const user = await userSchema.findById(userId);
  user.password = hashedPassword;
  await user.save();

  await passwordResetSchema.deleteOne({ userId: userId });

  res.json({ message: "Password reset successfully", status: 200 });
});

module.exports = router;
