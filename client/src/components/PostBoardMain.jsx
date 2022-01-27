import dayjs from "dayjs";
import SearchBtn from "./Button/SearchBtn";
import EditBtn from "./Button/EditBtn";
import CancelBtn from "./Button/CancelBtn";
import { BiArrowToLeft, BiLeftArrowAlt, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import PrivateBoardEditModal from "./PrivateBoardEditModal";
import swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { openModal } from "../redux/modules/privateBoardEditModal";
import { useDispatch, useSelector } from "react-redux";

export default function PostPage({ board, boardId }) {
  const dispatch = useDispatch();

  // 유저 아이디 받아옴
  const user_id = useSelector((state) => state.user.id);

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

  // 검색
  const refSearch = useRef(null);
  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const onChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length !== 0 && e.target.value.length < 3) {
        swal.fire({
          title: "Search failed",
          text: "Please type more than 3 letters",
          icon: "error",
          confirmButtonColor: "#D70569",
        });
        return;
      }
      setSearch(e.target.value);
    }
  };

  // Post 불러옴
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const getPosts = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${boardId}?page=${page}&search=${search}`)
      .then((res) => {
        setPosts(() => [...res.data.data]);
        setLastPage(res.data.lastPage);
      })
      .catch((err) => {
        swal.fire({
          title: "Board delete failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        });
      });
  }, [page, boardId, search]);

  useEffect(() => {
    if (page <= lastPage) {
      getPosts();
    }
  }, [getPosts, page, lastPage]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const number = parseInt(e.target.value);
      if (!e.target.value) return;
      if (typeof number === "number") setPage(number);
    }
  };

  const btnStyle = "text-2xl text-hibye-80 hover:text-hibye-40 cursor-pointer duration-300 self-center cursor-pointer";

  const refInput = useRef(null);
  const [inputNum, setInputNum] = useState("");
  const onChangeNum = (e) => {
    if (0 <= e.target.value && e.target.value <= lastPage) setInputNum(e.target.value);
    if (0 >= e.target.value && String(e.target.value).length > 1) {
      refInput.current.value = 1;
      setInputNum(1);
    }
  };

  const goNextPage = () => {
    if (page > 1) {
      setPage((state) => state - 1);
      refInput.current.value = page;
    }
  };

  const goPrevPage = () => {
    if (page < lastPage) {
      setPage((state) => state + 1);
      refInput.current.value = page;
    }
  };

  const goFirstPage = () => {
    if (page !== 1) {
      setPage(1);
      refInput.current.value = page;
    }
  };

  const goLastPage = () => {
    if (page !== lastPage) {
      setPage(lastPage);
      refInput.current.value = page;
    }
  };

  return (
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
        <div>
          <div className="border border-solid border-hibye-80 rounded-xl">
            <div className="flex text-hibye-10 bg-hibye-60 p-2 justify-between rounded-t-xl">
              <div className="flex">
                <div className="w-16 mr-8 ml-2 text-center">
                  <div>No</div>
                </div>
                <div className="w-640px">
                  <div>Title</div>
                </div>
              </div>
              <div className="flex">
                <div className="w-44 text-center">
                  <div>Author</div>
                </div>
                <div className="w-32 text-center mr-4 ml-4">
                  <div>Date</div>
                </div>
              </div>
            </div>
            <div>
              {posts.length === 0 ? (
                <div className="p-6 text-center text-lg text-gray-80 m-4">There's no post yet. Let's start posting!</div>
              ) : (
                posts.map((post) => (
                  <Link to={`/post/${boardId}/${post.id}`} key={post.id}>
                    <div className="flex text-hibye-80 p-2 justify-between text-sm border-t border-hibye-80">
                      <div className="flex">
                        <div className="w-16 mr-8 ml-2 text-center">
                          <div className="truncate">{post.rowNum}</div>
                        </div>
                        <div className="w-640px">
                          <div className="truncate">{post.title}</div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-44 text-center">
                          <div className="truncate">{post.User.username}</div>
                        </div>
                        <div className="w-32 text-center mr-4 ml-4">
                          <div className="truncate">{dayjs(post.updatedAt).format("YYYY-MM-DD HH:MM")}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between mt-6 gap- items-center">
              <div className="relative">
                <input
                  type="text"
                  ref={refSearch}
                  onChange={onChangeSearch}
                  onKeyPress={onKeyPressSearch}
                  value={inputSearch}
                  className="absolute w-6 pl-2 text-transparent pr-2 bg-transparent duration-300 focus:bg-hibye-20 focus:w-40 focus:border-hibye-80 focus:text-hibye-100"
                />
                <SearchBtn className="absolute" />
              </div>
              {user_id ? <div className="button--pink">Post</div> : null}
            </div>
            <div className="flex justify-center mt-6 pb-40 gap-4">
              <BiArrowToLeft className={`${btnStyle} ${page === 1 || page === 0 ? "text-hibye-40 cursor-default" : ""}`} onClick={goFirstPage} />
              <BiLeftArrowAlt className={`${btnStyle} ${page === 1 || page === 0 ? "text-hibye-40 cursor-default" : ""}`} onClick={goNextPage} />
              <div>
                <input
                  style={{ appearance: "none" }}
                  type="number"
                  onKeyUp={onKeyPress}
                  min="1"
                  max={lastPage}
                  className="mr-1 bg-gray-10 text-center w-12 rounded-lg pl-1 pr-1"
                  placeholder={page}
                  value={inputNum}
                  onChange={onChangeNum}
                  ref={refInput}
                />
                <span>/ {lastPage}</span>
              </div>
              <BiRightArrowAlt className={`${btnStyle} ${page === lastPage ? "text-hibye-40 cursor-default" : ""}`} onClick={goPrevPage} />
              <BiArrowToRight className={`${btnStyle} ${page === lastPage ? "text-hibye-40 cursor-default" : ""}`} onClick={goLastPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
