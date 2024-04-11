const router = require("express").Router();
const passwordResetSchema = require(
  "../../database/models/passwordResetSchema",
);

router.post("/", async (req, res) => {
  const { userId, resetToken } = req.body;
  const reset = await passwordResetSchema.findOne({
    userId: userId,
    resetToken: resetToken,
  });

  if (!reset) {
    return res.json({ message: "This reset link does not exist", status: 400 });
  }

  const now = new Date();
  if (now > reset.expiresAt) {
    return res.json({ message: "This reset link has expired", status: 400 });
  }

  res.json({ message: "Reset link is valid", status: 200 });
});

module.exports = router;
