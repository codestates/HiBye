const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.get("/:board_id", async function (req, res) {
  const boardId = req.params.board_id;
  const todoList = await models.Todo.findAll({
    where : {
      board_id: boardId
    }
  })
  res.status(200).json({
    data: todoList,
    message: "ok"
  })
})

module.exports = router;