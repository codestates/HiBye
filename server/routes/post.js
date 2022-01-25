const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.get("/:post_id", async function (req, res) {

  const postId = req.params.post_id;
  const post = await models.Post.findOne({
    where : {
      id: postId
    },
    include: [
      {
        model: models.User,
        required: true,
        attributes: ['username']
      }
    ]
  })

  if (!post) {
    res.status(404).json({message: "해당하는 게시물 없습니다."})
  } else {
    res.status(200).json({
      data: post,
      message: "게시물 조회"
    })
  }

})

router.post("/:user_id/:board_id", (req, res) => {
  
  const userId = req.params.user_id;
  const boardId = req.params.board_id;

  const { title, contents } = req.body;

  if (!userId || !boardId || !title || !contents) {
    res.status(400).json({message: "정보가 충분히 전달되지 않았습니다."})
  } else {
    models.Post.create({
      title: title,
      contents: contents,
      user_id: userId,
      board_id: boardId
    })
    res.status(201).json({message: "게시글 생성 완료했소이다."})
  }

})

router.patch("/:post_id", (req, res) => {
  
  const postId = req.params.post_id;
  const { title, contents } = req.body;

  models.Post.update({
    title: title,
    contents: contents
  }, {
    where: {
      id: postId
    }
  }).then((result) => {
    console.log("수정 성공 : ", result)
    res.status(200).json({message: "게시글 수정 성공이유-_-"})
  }).catch((error) => {
    console.log("수정 실패 : ", error)
    res.status(500).json({message: "게시글 수정 패망 . "})
  })

})

router.delete("/:post_id", (req, res) => {

  const postId = req.params.post_id;

  models.Post.destroy({
    where: {
      id: postId
    }
  }).then((result) => {
    console.log("삭제 성공 : ", result);
    res.status(204).json({message: "게시글 의 목을 땄다!"})
  })

})

module.exports = router;