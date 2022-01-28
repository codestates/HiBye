const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.post("/:user_id/:post_id", (req, res) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;

  const contents = req.body.contents;

  if ( !userId || !postId ) {
    res.status(404).json({message:"올바른 파라미터 값이 아닙니다."})
  } else {
    models.Comment.create({
      contents: contents,
      user_id: userId,
      post_id: postId
    }).then((result) => {
      console.log("저장 성공 : ", result)
      res.status(201).json({message:"Comment Created"})
    }).catch((error) => {
      console.log("저장 실패 : ", error)
      res.status(500).json({ message:"error"})
    })
  }
})

router.patch("/:comment_id", (req, res) => {
  const commentId = req.params.comment_id;
  const contents = req.body.contents;

  models.Comment.update({
    contents: contents
  },{
    where: {
      id: commentId
    }
  }).then((result) => {
    res.status(200).json({message: "update success!"})
  }).catch((error) => {
    res.status(500).json({message: "XXXXXX"})
  })

})

router.delete("/:comment_id", (req, res) => {
  const commentId = req.params.comment_id;

  models.Comment.destroy({
    where: {
      id: commentId
    }
  }).then((result) => {
    res.status(204).json({message: "comment delete"})
  })
})

module.exports = router;