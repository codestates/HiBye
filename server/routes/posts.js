const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
require('dotenv').config();

router.get("/:board_id", async function (req, res) {
  const searchValue = req.query.search;
  console.log("검색 값은 여기 있소 : ", searchValue)
  if (!searchValue) {
    const boardId = req.params.board_id;
    const postList = await models.Post.findAll({
      where : {
        board_id: boardId,
      },
      include: [
        {
          model: models.User,
          required: true,
          attributes: ['username']
        }
      ]
    })

    // console.log(postList)
    res.status(200).json({
      data: postList,
      message: "ok"
    })
  } else {
      // console.log(searchValue)
      const boardId = req.params.board_id;
      const postList = await models.Post.findAll({
        where : {
          [Op.and]: [
            {
              board_id: boardId
            },
            {
              title: {
                [Op.substring]: searchValue
              }
            }
          ]
        },
        include: [
          {
            model: models.User,
            required: true,
            attributes: ['username']
          }
        ]
      })

      // console.log(postList)
      res.status(200).json({
        data: postList,
        message: "ok"
      })
  }

})

module.exports = router;