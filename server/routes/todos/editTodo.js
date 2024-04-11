const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");

router.put("/", async (req, res) => {
  const { userId, todoId, title, description, isCompleted } = req.body;
  const user = await userSchema.findById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  const todo = user.todos.find((todo) => todo._id === todoId);
  if (!todo) {
    return res.status(404).json({ status: 404, message: "Todo not found" });
  }

  todo.title = title;
  todo.description = description;
  todo.isCompleted = isCompleted;
  await userSchema.findOneAndUpdate({ _id: userId }, {
    $set: { todos: user.todos },
  }, { new: true });
  let userObj = user.toObject();
  delete userObj.password;
  res.status(200).json({
    status: 200,
    message: "Todo updated successfully",
    user: userObj,
  });
});

module.exports = router;
