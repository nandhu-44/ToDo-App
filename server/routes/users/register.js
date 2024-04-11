const express = require("express");
const router = express.Router();
const userSchema = require("../../database/models/userSchema");
const cipherGuard = require("cipher-guard");

router.get("/", (req, res) => {
  res.send("Register page");
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const { CIPHER_GUARD_KEY, CIPHER_GUARD_SALT } = process.env;
  const hashedPassword = cipherGuard.encrypt(
    password,
    CIPHER_GUARD_KEY,
    CIPHER_GUARD_SALT,
  );
  const existingUser = await userSchema.findOne({ email: email });
  if (existingUser) {
    res.json({ message: "User already exists", status: 409 });
  } else {
    const user = new userSchema({
      name,
      email,
      password: hashedPassword,
    });
    user.save();
    let userObject = user.toObject();
    delete userObject.password;
    res.json({ message: "User created", user: userObject, status: 201 });
  }
});

module.exports = router;
