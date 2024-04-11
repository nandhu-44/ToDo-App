const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");
const { v4 } = require("uuid");

router.post("/", async (req, res) => {
  const { userId, title, description } = req.body;
  const user = await userSchema.findById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  user.todos.push({
    _id: v4(),
    title,
    description,
    createdAt: new Date(),
    isCompleted: false,
  });
  await user.save();
  let userObj = user.toObject();
  delete userObj.password;
  res.status(201).json({
    status: 201,
    message: "Todo added successfully",
    user: userObj,
  });
});

module.exports = router;
