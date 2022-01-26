const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
require('dotenv').config();

router.get("/", async function (req, res) {
  
  // models.User.create({
    
  // })
  
  res.send("Hello World!");
})

// router.get("/auth", (req, res) => {

//   const token = req.cookies.jwt;
  
//   if (!token) {
//     res.status(401).send({ data: null, message: "not authorized" });
//   } else {
//     const accessTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
//     if (!accessTokenData) {
//       res.status(401).send({ data: null, message: "not authorized" });
//     } else {
//       res.status(200).json({
//         data: accessTokenData,
//         message: "Auth Ok"
//       })
//     }
//   }
// })

router.post("/signin", async function (req, res) {
  
  const { email, password } = req.body
  console.log("이메일, 패스워드", email, password)
  if ( !email || !password ) {
    res.status(422).send("insufficient parameters supplied");
  } else {
    const userInfo = await models.User.findOne({
      where: {
        email: email,
      },
    })

    if (!userInfo) {
      res.status(401).json({ message: "User does not exist!"})
    } else {
      bcrypt.compare(password, userInfo.password, async (err, result) => {
        if (!result) {
          res.status(401).json({ message: "Password is incorrect"})
        } else {
          console.log("userInfo.coupleId : ", userInfo.couple_id)
          if (!userInfo.couple_id) {
              res.status(200).json({
                data: {
                  id: userInfo.id,
                  username: userInfo.username,
                  email: userInfo.email,
                  couple_id: null,
                  is_matching: null,
                  started_at: false
                }, 
                message:"로그인 성공"
              })
          } else {
            const coupleInfo = await models.Couple.findOne({
              where: {
                id: userInfo.couple_id
              }
            })
            res.status(200).json({
              data: {
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
                couple_id: userInfo.couple_id,
                is_matching: coupleInfo.is_matching,
                started_at: coupleInfo.started_at
              }, 
              message:"로그인 성공"
            })
          }
          
          // if (!userInfo.couple_id) {

          //   const accessToken = jwt.sign(
          //     {
          //       id: userInfo.id,
          //       username: userInfo.username,
          //       email: userInfo.email,
          //       couple_id: null,
          //       is_matching: null,
          //       d_day: null
          //     }, process.env.ACCESS_SECRET
          //   );

          //   res.cookie("jwt", accessToken, {
          //     sameSite: "none",
          //     httpOnly: true,
          //     secure: true
          //   }).status(200).json({message: "Login Success"})

          // } else {
          //   const coupleInfo = models.Couple.findOne({
          //     where: {
          //       id: couple_id
          //     }
          //   })
          //   const now = new Date();
          //   const gap = now.getTime() - coupleInfo.started_at.getTime();
          //   const day = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
          //   const accessToken = jwt.sign(
          //     {
          //       id: userInfo.id,
          //       username: userInfo.username,
          //       email: userInfo.email,
          //       couple_id: userInfo.couple_id,
          //       is_matching: coupleInfo.is_matching,
          //       d_day: day
          //     }, process.env.ACCESS_SECRET
          //   )
          //   res.cookie("jwt", accessToken, {
          //     sameSite: "none",
          //     httpOnly: true,
          //     secure: true
          //   }).status(200).json({message: "Login Success"})
          // }
          
        }
      })
    }

  }

})

router.post("/signup", async function (req, res) {
  
  const { username, email, password } = req.body;

  if ( !username || !email || !password ) {
    res.status(422).send("insufficient parameters supplied");
  } else {
    const existEmail = await models.User.findOne({
      where: {
        email: email
      }
    });
    const existUsername = await models.User.findOne({
      where: {
        username: username
      }
    })

    if (existEmail) {
      return res.status(409).json({ message: "email already exists"})
    }

    if (existUsername) {
      return res.status(409).json({ message: "username already exists"})
    }
    
    bcrypt.genSalt(10 , (err, salt) => {

      if (err) {
        console.log("salt error: ", err)
        res.status(500).json({ message: "salt error"})
      }

      bcrypt.hash(password, salt, (err, hash) => {

        if (err) {
          console.log(err)
          res.status(500).json({ message: "password error" })
        } else {
          models.User.create({
            username: username,
            email: email,
            password: hash
          }).then((result) => {
            console.log("저장 성공 : ", result)
            res.status(201).json({message:"User Created"})
          }).catch((error) => {
            console.log("저장 실패 : ", error)
            res.status(500).json({ message:"error"})
          })
        }

      })

    })

    


    // models.User.create({
    //   // username: "test1",
    //   // email: "test@test.com",
    //   // password: "testpassword"
    //   username: username,
    //   email: email,
    //   password: password
    // }).then((result) => {
    //   console.log("저장 성공 : ", result)
    //   res.status(201).json({ message: "ok"})
    // }).catch((error) => {
    //   console.log("저장 실패 : ", error)
    //   res.status(400).json({ message: "error"})
    // })
  }

})

router.post("/signout", function (req, res) {
  // res.status(200).clearCookie('jwt').json({message: "Logout Success"})
  res.status(200).json({message: "Logout Success"})
})

module.exports = router;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
