import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
// import { getPosts } from "../redux/modules/posts";
import Error from "./Error";
import Chats from "../components/Chats";
import EditBtn from "../components/Button/EditBtn";
import RenewBtn from "../components/Button/RenewBtn";
import Spinner from "../components/Spinner";
import { openModal } from "../redux/modules/privateBoardEditModal";
import PrivateBoardEditModal from "../components/PrivateBoardEditModal";
import getByteLength from "../utils/getByteLength";
import swal from "sweetalert2";
import axios from "axios";
import CancelBtn from "../components/Button/CancelBtn";
import { useInView } from "react-intersection-observer";
import useBoardCheck from "../utils/useBoardCheck";

export default function ChatBoard() {
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

  // 무한 스크롤(현재 보드에서 posts 불러옴)
  const [refView, inView] = useInView({
    threshold: 0.5,
  });
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getChats = useCallback(async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/posts/${boardId}?page=${page}`).then((res) => {
      setChats((state) => [...state, ...res.data.data]);
      setLastPage(res.data.lastpage);
    });
    setLoading(false);
  }, [page, boardId]);

  useEffect(() => {
    if (page <= lastPage) getChats();
  }, [getChats, page, lastPage]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((state) => state + 1);
    }
  }, [inView, loading]);

  // // 현재 보드에서 posts 불러옴
  // const posts = useSelector((state) => state.posts);
  // useEffect(() => {
  //   dispatch(getPosts(boardId, page));
  // }, [dispatch, boardId, page]);

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

  // 유저 아이디 받아옴
  const user_id = useSelector((state) => state.user.id);

  // 게시물 작성
  const refContents = useRef(null);
  const [valid, setValid] = useState({ isValid: true });
  const [contents, setContents] = useState("");
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const sendPost = () => {
    // 로그인 여부 검사
    if (!user_id) {
      swal.fire({
        title: "Chat sending failed",
        text: "Please sign in to send chat",
        icon: "error",
        confirmButtonColor: "#D70569",
      });
      return;
    }

    // 유효성 검사
    const contentsByte = getByteLength(contents);
    if (contentsByte < 1 || contentsByte > 150 || /\s{2,}|^\s|\s$/g.test(contents)) {
      setValid((state) => ({ ...state, isValid: false }));
      refContents.current.focus();
      return;
    }

    setValid((state) => ({ ...state, isValid: true }));

    axios
      .post(`${process.env.REACT_APP_API_URL}/post/${user_id}/${board.id}`, {
        title: null,
        contents: contents,
      })
      .then(() => {
        setContents("");
        refContents.current.value = "";
      })
      .then(() => {
        swal
          .fire({
            title: "Chat sending success",
            icon: "success",
            confirmButtonColor: "#D70569",
          })
          .then(() => {
            window.location.reload();
          });
      })
      .catch((err) =>
        swal.fire({
          title: "Chat sending failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        }),
      );
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
            <div className="flex justify-between gap-4 p-5">
              <input className="flex-grow rounded-2xl border bg-gray-10 pl-3 pr-3 text-gray-80" ref={refContents} onChange={onChangeContents} />
              <div className="flex-grow-0 button--pink" onClick={sendPost}>
                Send
              </div>
              <div className="flex-grow-0 self-center" onClick={() => window.location.reload()}>
                <RenewBtn />
              </div>
            </div>
            {valid.isValid ? null : <div className="text-hibye-80 text-sm text-center mb-2">Invalid chat. Please check again.</div>}
            <div className="p-5">
              <Chats chats={chats} user_id={user_id} />
              <div ref={refView} className="text-center mt-4">
                {loading ? <Spinner /> : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
