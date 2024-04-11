const express = require("express");
const router = express.Router();
const userSchema = require("../../database/models/userSchema");
const cipherGuard = require("cipher-guard");

router.get("/", (_req, res) => {
  res.send("Login page");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = cipherGuard.encrypt(
    password,
    process.env.CIPHER_GUARD_KEY,
    process.env.CIPHER_GUARD_SALT,
  );
  const user = await userSchema.findOne({
    email: email,
    password: hashedPassword,
  });
  if (user) {
    let userObject = user.toObject();
    delete userObject.password;
    res.json({ message: "Login successful", status: 200, user: userObject });
  } else {
    res.json({ message: "Login failed", status: 401 });
  }
});

module.exports = router;
