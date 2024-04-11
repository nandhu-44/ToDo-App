const express = require("express");
const router = express.Router();

const addTodo = require("./addTodo");
const editTodo = require("./editTodo");
const deleteTodo = require("./deleteTodo");
const clearCompletedTodos = require("./clearCompletedTodos");

router.use("/addTodo", addTodo);
router.use("/editTodo", editTodo);
router.use("/deleteTodo", deleteTodo);
router.use("/clearCompletedTodos", clearCompletedTodos);

module.exports = router;
