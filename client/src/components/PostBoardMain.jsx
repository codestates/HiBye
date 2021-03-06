import dayjs from "dayjs";
import SearchBtn from "./Button/SearchBtn";
import { CancelBtnSmall } from "./Button/CancelBtn";
import { BiArrowToLeft, BiLeftArrowAlt, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../utils/useQuery";

export default function PostPage({ board, boardId }) {
  const navigate = useNavigate();
  const query = useQuery();

  const queryPage = query.get("page");
  const querySearch = query.get("search") || "";

  // 유저 아이디 받아옴
  const user_id = useSelector((state) => state.user.id);

  // 검색
  const refSearch = useRef(null);
  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const onChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length !== 0 && e.target.value.length < 2) {
        swal.fire({
          title: "Search failed",
          text: "Please type more than 2 letters",
          icon: "error",
          confirmButtonColor: "#D70569",
        });
        return;
      } else {
        setSearch(e.target.value);
        setInputSearch("");
        setPage(1);
        setInputNum(1);
        navigate(`/post/${boardId}?page=${1}&search=${e.target.value}`);
        refSearch.current.blur();
      }
    }
  };

  const searchCancel = () => {
    setSearch("");
    setInputSearch("");
    navigate(`/post/${boardId}?page=${1}&search=${""}`);
  };

  // Post 불러옴
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(Number.MAX_SAFE_INTEGER);
  const getPosts = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${boardId}?page=${queryPage}&search=${querySearch}`)
      .then((res) => {
        setPosts(() => [...res.data.data]);
        setLastPage(res.data.lastpage);
      })
      .catch((err) => {
        swal.fire({
          title: "Board delete failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        });
      });
  }, [queryPage, boardId, querySearch]);

  useEffect(() => {
    if (queryPage <= lastPage) {
      getPosts();
    }
  }, [getPosts, queryPage, lastPage]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const number = parseInt(e.target.value);
      if (!e.target.value) return;
      if (typeof number === "number") {
        setPage(number);
        navigate(`/post/${boardId}?page=${number}&search=${querySearch}`);
      }
    }
  };

  const btnStyle = "text-2xl text-hibye-80 hover:text-hibye-40 cursor-pointer duration-300 self-center cursor-pointer";

  const [inputNum, setInputNum] = useState("");
  const onChangeNum = (e) => {
    if (0 <= e.target.value && e.target.value <= lastPage) setInputNum(e.target.value);
    if (0 >= e.target.value && String(e.target.value).length > 1) {
      setInputNum(1);
    }
  };

  const goPage = (params) => {
    if (params === "prev") {
      if (page > 1) {
        setPage((state) => state - 1);
        setInputNum((state) => state - 1);
        navigate(`/post/${boardId}?page=${page - 1}&search=${search}`);
      }
    }
    if (params === "next") {
      if (page < lastPage) {
        setPage((state) => state + 1);
        setInputNum((state) => state + 1);
        navigate(`/post/${boardId}?page=${page + 1}&search=${search}`);
      }
    }
    if (params === "first") {
      if (page > 1) {
        setPage(1);
        setInputNum(1);
        navigate(`/post/${boardId}?page=${1}&search=${search}`);
      }
    }
    if (params === "last") {
      if (page < lastPage) {
        setPage(lastPage);
        setInputNum(lastPage);
        navigate(`/post/${boardId}?page=${lastPage}&search=${search}`);
      }
    }
  };

  return (
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
            !search ? (
              <div className="p-6 text-center text-lg text-gray-80 m-4">There's no post yet. Let's start posting!</div>
            ) : (
              <div className="p-6 text-center text-lg text-gray-80 m-4">We couldn't find a post containing "{search}"</div>
            )
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
            <div className="flex">
              <SearchBtn className="absolute" />
              {search ? (
                <div className="flex items-center gap-1">
                  <div className="ml-2 text-hibye-80">{querySearch}</div>
                  <div onClick={searchCancel}>
                    <CancelBtnSmall className="self-center" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {user_id ? <div className="button--pink">Post</div> : null}
        </div>
        <div className="flex justify-center mt-6 pb-40 gap-4">
          <BiArrowToLeft className={`${btnStyle} ${page === 1 || page === 0 ? "text-hibye-40 cursor-default" : ""}`} onClick={() => goPage("first")} />
          <BiLeftArrowAlt className={`${btnStyle} ${page === 1 || page === 0 ? "text-hibye-40 cursor-default" : ""}`} onClick={() => goPage("prev")} />
          <div>
            <input
              style={{ appearance: "none" }}
              type="number"
              onKeyUp={onKeyPress}
              min="1"
              max={lastPage}
              className="mr-1 bg-gray-10 text-center w-12 rounded-lg pl-1 pr-1"
              placeholder={queryPage}
              value={inputNum}
              onChange={onChangeNum}
            />
            {lastPage >= Number.MAX_SAFE_INTEGER ? null : <span>/ {lastPage}</span>}
          </div>
          <BiRightArrowAlt className={`${btnStyle} ${page === lastPage ? "text-hibye-40 cursor-default" : ""}`} onClick={() => goPage("next")} />
          <BiArrowToRight className={`${btnStyle} ${page === lastPage ? "text-hibye-40 cursor-default" : ""}`} onClick={() => goPage("last")} />
        </div>
      </div>
    </div>
  );
}
