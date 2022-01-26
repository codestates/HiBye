const express = require("express");
const router = express.Router();
const models = require("../models");
require('dotenv').config();

router.get("/:post_id", async function (req, res) {

  const postId = req.params.post_id;

  const commentList = await models.Comment.findAll({
    where : {
      post_id: postId
    }
  })

  // console.log(publicBoard)
  res.status(200).json({
    data: commentList,
    message: "ok"
  })

})

module.exports = router;