const express = require("express");
const models = require("./models/index.js");
const app = express();
const port = 80;
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const indexRouter = require("./routes/index");
const boardRouter = require("./routes/board");
const boardsRouter = require("./routes/boards");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");
const commentsRouter = require("./routes/comments");
const todoRouter = require("./routes/todos");
const todosRouter = require("./routes/todos");

app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

app.use("/", indexRouter);
app.use("/board", boardRouter);
app.use("/boards", boardsRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/comment", commentRouter);
app.use("/comments", commentsRouter);
app.use("/todo", todoRouter);
app.use("/todos", todosRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
