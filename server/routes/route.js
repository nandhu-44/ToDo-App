const express = require("express");
const router = express.Router();

const users = require("./users/index");
const todos = require("./todos/index");

router.use("/users", users);
router.use("/todos", todos);

module.exports = router;
