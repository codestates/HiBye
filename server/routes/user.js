const express = require("express");
const router = express.Router();
const models = require("../models");
const bcrypt = require("bcryptjs");
require("dotenv").config();

router.get("/:user_id", async function (req, res) {
  const userId = req.params.user_id;

  if (!userId) {
    return res.status(400).json({ message: "bad request" });
  }

  const userInfo = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  if (!userInfo) {
    res.status(401).json({ message: "User does not exist!" });
  } else {
    if (!userInfo.couple_id) {
      res.status(200).json({
        data: {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          couple_id: null,
          is_matching: null,
          started_at: false,
        },
        message: "유저 정보 조회 성공",
      });
    } else {
      const coupleInfo = await models.Couple.findOne({
        where: {
          id: userInfo.couple_id,
        },
      });
      res.status(200).json({
        data: {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          couple_id: userInfo.couple_id,
          is_matching: coupleInfo.is_matching,
          started_at: coupleInfo.started_at,
        },
        message: "유저 정보 조회 성공",
      });
    }
  }
});

router.patch("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const { username } = req.body;

  models.User.update(
    {
      username: username,
    },
    {
      where: {
        id: userId,
      },
    },
  )
    .then((result) => {
      console.log("수정 성공 : ", result);
      res.status(201).json({ message: "유저 정보 수정 성공" });
    })
    .catch((error) => {
      console.log("수정 실패 : ", error);
      res.status(500).json({ message: "error" });
    });

  // models.User.update({
  //   username: username,
  //   password: password
  // }, {
  //   where: {
  //     id: userId
  //   }
  // })
});

router.delete("/:user_id", (req, res) => {
  const userId = req.params.user_id;

  models.User.destroy({
    where: {
      id: userId,
    },
  }).then((result) => {
    console.log("유저 레코드 하나 삭제 완료");
    res.status(204).json({ message: "유저 레코드 하나 삭제 완료 했음" });
  });
});

router.post("/:user_id/match", async (req, res) => {
  const userId = req.params.user_id;
  const receiverUsername = req.body.username;

  const receiverInfo = await models.User.findOne({
    where: {
      username: receiverUsername,
    },
  });
  // 1. 커플 테이블에 센더아이디 부분에 유저아이디가 있는지 확인.
  // 1-1 있다면 거절.
  // 1-2 없다면 리시버아이디부분에 유저아이디가 있는지 확인.
  // 1-2-1 없다면 커플 테이블에 새로운 레코드를 추가, 센더아이디에는 유저의 아이디 리시버의 아이디에는 리시버인포의 아이디
  // 1-2-2 있다면 센더아이디부분에 리시버인포의 아이디와 동일한지 확인
  // 1-2-2-1 동일하다면 해당 레코드의 이즈매칭을 트루로, 커플아이디를 현재 신청한 유저의 커플아이디 정보를 업데이트
  // 1-2-2-2 동일하지 않다면 커플 테이블에 새로운 레코드를 추가, 센더아이디에는 유저의 아이디 리시버의 아이디에는 리시버 인포의 아이디

  await models.Couple.findOne({
    where: {
      sender_id: userId,
    },
  }).then(async (record) => {
    if (record === null) {
      await models.Couple.findOne({
        where: {
          receiver_id: userId,
        },
      }).then(async (result) => {
        if (!result) {
          models.Couple.create({
            is_matching: false,
            started_at: null,
            sender_id: userId,
            receiver_id: receiverInfo.id,
          })
            .then((result) => {
              models.User.update(
                {
                  couple_id: result.id,
                },
                {
                  where: {
                    id: userId,
                  },
                },
              ).then(() => {
                console.log("새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요! result.id : ");
                res.status(201).json({ message: "새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!" });
              });
            })
            .catch((error) => {
              res.status(500).json({ error, message: "error" });
            });
        } else {
          const tempList = await models.Couple.findOne({
            where: {
              sender_id: receiverInfo.id,
            },
          });

          if (!tempList) {
            models.Couple.create({
              is_matching: false,
              started_at: null,
              sender_id: userId,
              receiver_id: receiverInfo.id,
            })
              .then((result) => {
                models.User.update(
                  {
                    couple_id: result.id,
                  },
                  {
                    where: {
                      id: userId,
                    },
                  },
                ).then(() => {
                  console.log("새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요! result.id : ");
                  res.status(201).json({ message: "새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!" });
                });
              })
              .catch((error) => {
                res.status(500).json({ error, message: "error" });
              });
          } else {
            models.Couple.update(
              {
                is_matching: true,
              },
              {
                where: {
                  id: tempList.id,
                },
              },
            ).then(() => {
              models.User.update(
                {
                  couple_id: tempList.id,
                },
                {
                  where: {
                    id: userId,
                  },
                },
              ).then((result) => {
                res.status(200).json({ message: "커플 등록이 완료 되었습니다. 커플 기능을 활용해 보세요" });
              });
            });
          }
        }
      });
    } else {
      console.log("data1: ");
      res.status(409).json({ message: "이미 커플 신청을 하셨거나 커플이 등록되어 있습니다." });
    }
  });

  // .catch(async () => {
  //   await models.Couple.findOne({
  //     where: {
  //       receiver_id: userId
  //     }
  //   }).then((result) => {
  //     if (result.sender_id === receiverInfo.id) {
  //       models.Couple.update({
  //         is_matching: true,
  //       },{
  //         where: {
  //           id: result.id
  //         }
  //       }).then(() => {
  //         models.User.update({
  //           couple_id: result.id
  //         },{
  //           where: {
  //             id: userId
  //           }
  //         }).then(() => {
  //           res.status(201).json({message: "커플 매칭이 되었습니다. 커플 기능들을 활용해보세요!"})
  //         })
  //       })
  //     } else {
  //       models.Couple.create({
  //         is_matching: false,
  //         started_at: null,
  //         sender_id: userId,
  //         receiver_id: receiverInfo.id
  //       }).then((result) => {
  //         console.log("새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!")
  //         res.status(201).json({message: "새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!"})
  //       }).catch((error) => {
  //         res.status(500).json({error, message: "error"})
  //       })
  //     }
  //   }).catch(() => {
  //     models.Couple.create({
  //       is_matching: false,
  //       started_at: null,
  //       sender_id: userId,
  //       receiver_id: receiverInfo.id
  //     }).then((result) => {
  //       console.log("새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!@")
  //       res.status(201).json({message: "새로운 커플 레코드를 생성했습니다. 상대방에게도 얼른 알려주세요!2"})
  //     }).catch((error) => {
  //       res.status(500).json({error, message: "error2"})
  //     })
  //   })
  // })
});

router.delete("/:user_id/match", async (req, res) => {
  const userId = req.params.user_id;
  const userInfo = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  models.Couple.destroy({
    where: {
      id: userInfo.couple_id,
    },
  }).then((result) => {
    console.log("커플 신청이 취소 되었습니다.");
    res.status(204).json({ message: "커플 신청 취소 되었습니다." });
  });
});

router.delete("/:user_id/breakup", async (req, res) => {
  const userId = req.params.user_id;
  const userInfo = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  models.Couple.destory({
    where: {
      id: userInfo.couple_id,
    },
  }).then((result) => {
    console.log("당신의 아름다운 추억들 한줌의 잿더미로 대체되었다.");
    res.status(204).json({ message: "당신의 아름다운 추억들 한줌의 잿더미로 대체되었다." });
  });
});

module.exports = router;
