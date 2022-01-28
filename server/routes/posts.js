const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
require("dotenv").config();

router.get("/:board_id", async function (req, res) {
  const boardId = req.params.board_id;
  const searchValue = req.query.search;
  let pageNum = req.query.page;
  let offset = 0;
  let limit = 10;
  let count = await models.Post.count({
    where: {
      board_id: boardId,
    },
  });
  lastpage = parseInt(count / limit);

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  console.log("검색 값은 여기 있소 : ", searchValue);
  if (!searchValue) {
    const postList = await models.Post.findAll({
      offset: offset,
      limit: limit,
      where: {
        board_id: boardId,
      },
      order: [["updated_at", "DESC"]],
      include: [
        {
          model: models.User,
          required: true,
          attributes: ["username"],
        },
      ],
    });

    postList.map((data, index) => {
      console.log(data.dataValues);
      data.dataValues.rowNum = count - (index + offset);
    });

    res.status(200).json({
      data: postList,
      lastpage: lastpage,
      message: "ok",
    });
  } else {
    // console.log(searchValue)
    const postList = await models.Post.findAll({
      offset: offset,
      limit: limit,
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
      order: [["updated_at", "DESC"]],
    });

    postList.map((data, index) => {
      console.log(data.dataValues);
      data.dataValues.rowNum = count - (index + offset);
    });

    res.status(200).json({
      data: postList,
      lastpage: lastpage,
      message: "ok",
    });
  }
});

module.exports = router;
