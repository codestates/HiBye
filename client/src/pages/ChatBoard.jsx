import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getPosts } from "../redux/modules/posts";
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
export default function ChatBoard() {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  //* state.publicBoards.data.data: undefined -> [...]
  const publicBoards = useSelector((state) => state.publicBoards);
  const privateBoards = useSelector((state) => state.privateBoards);
  const publicBoardsData = publicBoards.data.data || [];
  const privateBoardsData = privateBoards.data.data || [];
  const publicBoard = publicBoardsData.filter((board) => String(board.id) === boardId);
  const privateBoard = privateBoardsData.filter((board) => String(board.id) === boardId);
  const board = publicBoard.length !== 0 ? publicBoard[0] : privateBoard[0];
  const isLoading = publicBoards.loading && privateBoards.loading;

  const user_id = useSelector((state) => state.user.id);

  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts(boardId));
  }, [dispatch, boardId]);

  const [threeSec, setThreeSet] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setThreeSet(true);
    }, 2000);
  });

  const open = () => {
    dispatch(openModal());
  };

  // POST: post
  const refContents = useRef(null);
  const [valid, setValid] = useState({ isValid: true });
  const [contents, setContents] = useState("");
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const sendPost = () => {
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
      .catch((err) =>
        swal.fire({
          title: "Chatting failed",
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
        threeSec ? (
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
                  <div className="ml-4 self-center" onClick={open}>
                    <EditBtn />
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
              <Chats posts={posts} user_id={user_id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
