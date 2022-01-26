const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.get("/", async function (req, res) {
  const publicBoard = await models.Board.findAll({
    where : {
      couple_id: null
    }
  })

  // console.log(publicBoard)
  res.status(200).json({
    data: publicBoard,
    message: "ok"
  })

})

router.get("/:couple_id", async function (req, res) {

  const coupleId = req.params.couple_id
  // console.log("coupleid : ", coupleId)
  const privateBoard = await models.Board.findAll({
    where: {
      couple_id: coupleId
    }
  })

  // console.log(privateBoard)
  res.status(200).json({data: privateBoard, message: "ok"})

})


module.exports = router;

