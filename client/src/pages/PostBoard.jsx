import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import useBoardCheck from "../utils/useBoardCheck";
import Spinner from "../components/Spinner";
import PostBoardMain from "../components/PostBoardMain";
// import Post from "../components/Post";

export default function PostBoard() {
  // Params로 경로 확인
  const { boardId } = useParams();

  // 올바른 보드인지 확인
  const { board, isLoading } = useBoardCheck(boardId);

  // 시간 확인해서 로딩중에 에러로 안보내게 만듦
  const [checkTwoSec, setCheckTwoSec] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCheckTwoSec(true);
    }, 2000);
  });

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
          <Spinner />
        </div>
      ) : !board ? (
        checkTwoSec ? (
          <Error />
        ) : (
          <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
            <Spinner />
          </div>
        )
      ) : (
        <Routes>
          <Route exact path="/" element={<PostBoardMain board={board} boardId={boardId} />} />
          {/* <Route exact path="/:postId" element={<Post />} /> */}
        </Routes>
      )}
    </>
  );
}
