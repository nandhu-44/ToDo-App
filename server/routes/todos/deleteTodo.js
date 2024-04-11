const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");

router.delete("/", async (req, res) => {
  const { userId, todoId } = req.body;
  const user = await userSchema.findById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  const todoIndex = user.todos.findIndex((todo) => todo._id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ status: 404, message: "Todo not found" });
  }

  user.todos.splice(todoIndex, 1);
  await userSchema.findOneAndUpdate({ _id: userId }, {
    $set: { todos: user.todos },
  }, { new: true });
  let userObj = user.toObject();
  delete userObj.password;
  res.status(200).json({
    status: 200,
    message: "Todo deleted successfully",
    user: userObj,
  });
});

module.exports = router;
