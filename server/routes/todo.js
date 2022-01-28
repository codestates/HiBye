const express = require("express");
const router = express.Router();
const models = require("../models");
require("dotenv").config();

router.post("/:board_id", (req, res) => {
  if (!req.params["board_id"]) {
    return res.status(404).json({ message: "Not Found" });
  } else {
    const boardId = req.params["board_id"];
    const contents = req.body.contents;

    models.Todo.create({
      contents: contents,
      is_completed: false,
      board_id: boardId,
    })
      .then((result) => {
        res.status(201).json({ message: "created success!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
});

router.delete("/:todo_id", (req, res) => {
  // console.log("todo _ I d : ", req.params["todo_id"]);
  if (!req.params["todo_id"]) {
    return res.status(404).json({ message: "Not Found" });
  }

  const todoId = req.params["todo_id"];

  models.Todo.destroy({
    where: {
      id: todoId,
    },
  }).then((result) => {
    res.status(204).json({ message: " 투두 리 스 두 삭제 " });
  });
});

module.exports = router;
