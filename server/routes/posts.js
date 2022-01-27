const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
require("dotenv").config();

router.get("/:board_id", async function (req, res) {
  const searchValue = req.query.search;
  let pageNum = req.query.page;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  console.log("검색 값은 여기 있소 : ", searchValue);
  if (!searchValue) {
    const boardId = req.params.board_id;
    const postList = await models.Post.findAll({
      offset: offset,
      limit: 10,
      where: {
        board_id: boardId,
      },
      include: [
        {
          model: models.User,
          required: true,
          attributes: ["username"],
        },
      ],
    });

    // console.log(postList)
    res.status(200).json({
      data: postList,
      lastpage: 10, // #To-Do 라스트페이지 수정필요
      message: "ok",
    });
  } else {
    // console.log(searchValue)
    const boardId = req.params.board_id;
    const postList = await models.Post.findAll({
      offset: offset,
      limit: 10,
      where: {
        [Op.and]: [
          {
            board_id: boardId,
          },
          {
            title: {
              [Op.substring]: searchValue,
            },
          },
        ],
      },
      include: [
        {
          model: models.User,
          required: true,
          attributes: ["username"],
        },
      ],
    });

    // console.log(postList)
    res.status(200).json({
      data: postList,
      lastpage: 10, // #To-Do 라스트페이지 수정필요
      message: "ok",
    });
  }
});

module.exports = router;
