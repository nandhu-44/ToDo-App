const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");

router.delete("/", async (req, res) => {
  const { userId } = req.body;
  const user = await userSchema.findById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  await userSchema.updateOne(
    { _id: userId },
    { $pull: { todos: { isCompleted: true } } },
  );
  let userObj = await userSchema.findById(userId);
  delete userObj.password;
  return res.status(200).json({ status: 200, user: userObj });
});

module.exports = router;
