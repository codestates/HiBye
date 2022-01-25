const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.get("/:board_id", async function (req, res) {
  const boardId = req.params.board_id;
  
  const boardInfo = await models.Board.findOne({
    where: {
      id: boardId
    }
  })
  if (!boardInfo) {
    res.status(500).json({message: "fail"})
  } else {
      res.status(200).json({
      name:boardInfo.name,
      desc:boardInfo.desc, 
      couple_id:boardInfo.couple_id
    })
  }
  

})

router.patch("/:board_id", (req, res) => {
  const boardId = req.params.board_id;

  const { name, theme, desc } = req.body

  models.Board.update({
    name: name,
    theme: theme,
    desc: desc
  }, {
    where: {
      id: boardId
    }
  }).then((result) => {
    // console.log("수정 성공 : ", result)
    res.status(200).json({message: "Update Success!"})
  }).catch((error) => {
    // console.log("수정 실패 : ", error)
  })

})

router.delete("/:board_id", (req, res) => {

  const boardId = req.params.board_id;

  models.Board.destroy({
    where: {
      id: boardId
    }
  }).then((result) => {
    console.log("삭제 성공 : ", result);
    res.status(204).json({message: "Couple board delete Success!"})
  })

})

router.post("/:couple_id", (req, res) => {
  const coupleId = req.params.couple_id
  const { name, theme, category, desc } = req.body

  models.Board.create({
    name: name,
    theme: theme,
    category: category,
    desc: desc,
    couple_id: coupleId
  })

  res.status(201).json({name: name, message: "게시판 생성 완료!"})

})

module.exports = router;

