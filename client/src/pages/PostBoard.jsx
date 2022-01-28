import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import useBoardCheck from "../utils/useBoardCheck";
import Spinner from "../components/Spinner";
import PostBoardMain from "../components/PostBoardMain";
import Post from "../components/Post";
import { openModal } from "../redux/modules/privateBoardEditModal";
import { useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import PrivateBoardEditModal from "../components/PrivateBoardEditModal";
import EditBtn from "../components/Button/EditBtn";
import CancelBtn from "../components/Button/CheckBtn";

export default function PostBoard() {
  const dispatch = useDispatch();

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

  // 보드 수정 모달 오픈
  const open = () => {
    dispatch(openModal());
  };

  // 보드 삭제
  const deleteBoard = () => {
    swal
      .fire({
        title: "Are yue sure?",
        showCancelButton: true,
        icon: "warning",
        confirmButtonColor: "#D70569",
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/board/${board.id}`)
            .then(() => {
              swal
                .fire({
                  title: "Board delete success",
                  text: `"${board.name}" has been deleted`,
                  icon: "success",
                  confirmButtonColor: "#D70569",
                })
                .then(() => {
                  window.location.reload();
                });
            })
            .catch((err) => {
              swal.fire({
                title: "Board delete failed",
                text: `${err}`,
                icon: "error",
                confirmButtonColor: "#D70569",
              });
            });
        }
      });
  };

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
        <div className="bg-hibye-10">
          <PrivateBoardEditModal board_id={board.id} prev_name={board.name} prev_desc={board.desc} />
          <div className="inner pt-4">
            <div className="mt-10 p-5">
              <div className="mb-4 flex">
                <div className="text-hibye-80 font-bold text-xl">{board.name}</div>
                {board.couple_id ? (
                  <div className="flex">
                    <div className="ml-4 self-center" onClick={open}>
                      <EditBtn />
                    </div>
                    <div className="ml-1 self-center" onClick={deleteBoard}>
                      <CancelBtn />
                    </div>
                  </div>
                ) : null}
              </div>
              <div>
                <div className="text-gray-80 text-base">{board.desc}</div>
              </div>
            </div>
            <Routes>
              <Route exact path="/" element={<PostBoardMain board={board} boardId={boardId} />} />
              <Route exact path="/:postId" element={<Post />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
