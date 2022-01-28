import EditBtn from "../components/Button/EditBtn";
import { FiArrowRightCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckBtn from "../components/Button/CheckBtn";
import CancelBtn2 from "../components/Button/CancelBtn2";
import { useRef } from "react";
import axios from "axios";
import swal from "sweetalert2";
import getByteLength from "../utils/getByteLength";
import { removeUserInfo } from "../redux/modules/user";

export default function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);

  // 이름 수정
  const refUsername = useRef(null);

  const [isEditName, setIsEditName] = useState(false);
  const onEditName = () => {
    setIsEditName(true);
  };

  const offEditName = () => {
    setInputUsername(userInfo.username);
    setIsEditName(false);
  };

  const [inputUsername, setInputUsername] = useState(userInfo.username);
  const changeUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const changeUsername = () => {
    const nameByte = getByteLength(inputUsername);
    if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(inputUsername)) {
      setIsUsernameValid(false);
      refUsername.current.focus();
      return;
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/user/${userInfo.id}`, {
        username: inputUsername,
        // password: null,
      })
      .then(() => {
        swal
          .fire({
            title: "User name change successful",
            icon: "success",
            confirmButtonColor: "#D70569",
          })
          .then(() => {
            setIsEditName(false);
          });
      })
      .catch((err) =>
        swal.fire({
          title: "User name change failed.",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        }),
      );
  };

  // 계정 삭제
  const deleteId = () => {
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
            .delete(`${process.env.REACT_APP_API_URL}/user/${userInfo.id}`)
            .then(() => {
              swal
                .fire({
                  title: "User id delete successful",
                  icon: "success",
                  confirmButtonColor: "#D70569",
                })
                .then(() => {
                  navigate("/");
                  dispatch(removeUserInfo());
                });
            })
            .catch((err) => {
              swal.fire({
                title: "User id delete failed",
                text: `${err}`,
                icon: "error",
                confirmButtonColor: "#D70569",
              });
            });
        }
      });
  };

  // 연인 매칭
  const refLover = useRef(null);

  const [inputLover, setInputLover] = useState("");
  const changeLoverInput = (e) => {
    setInputLover(e.target.value);
  };

  const [matching_status, setMatching_status] = useState("no");

  const addLover = () => {
    console.log("버튼 누름");
    const nameByte = getByteLength(inputLover);
    if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(inputLover)) {
      setIsUsernameValid(false);
      refLover.current.focus();
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/${userInfo.id}/match`, {
        username: inputLover,
      })
      .then(() => {
        swal.fire({
          title: "Couple matching success",
          icon: "success",
          confirmButtonColor: "#D70569",
        });
      })
      .catch((err) => {
        swal.fire({
          title: "Couple matching failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        });
      });
  };

  return (
    <>
      {!userInfo.id ? (
        <Navigate to="/signin" />
      ) : (
        <div className="bg-hibye-10">
          <div className="inner flex justify-center items-center">
            <div className="mt-24 mb-24 p-10">
              <div className="flex items-center mb-12">
                {!isEditName ? (
                  <div className="text-hibye-80 text-lg mr-3 font-bold">{userInfo.username}</div>
                ) : (
                  <input
                    className="self-center text-hibye-100 text-base rounded-2xl border bg-gray-10 pl-3 pr-3 w-56 mr-3"
                    placeholder="Enter username"
                    ref={refUsername}
                    value={inputUsername}
                    onChange={changeUsernameInput}
                  />
                )}
                {!isEditName ? (
                  <div onClick={onEditName}>
                    <EditBtn className="self-center text-2xl text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300" />
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <div onClick={changeUsername}>
                      <CheckBtn />
                    </div>
                    <div onClick={offEditName}>
                      <CancelBtn2 />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex bb-12 mb-8">
                <div className="text-hibye-60 text-sm font-bold w-28 mr-8">Email address</div>
                <div className="text-gray-80 text-sm">{userInfo.email}</div>
              </div>

              <div className="flex mb-2">
                <div className="text-hibye-60 text-sm font-bold w-28 mr-8">Lover</div>
                {!userInfo.couple_id ? (
                  <>
                    <input
                      className="text-hibye-100 text-sm rounded-2xl border bg-gray-10 pl-3 pr-3 mb-3 w-56"
                      placeholder="Enter username"
                      onChange={changeLoverInput}
                      value={inputLover}
                      ref={refLover}
                    />
                    <div onClick={addLover}>
                      <FiArrowRightCircle className="text-2xl text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300 ml-2" ref={refLover} />
                    </div>
                  </>
                ) : !userInfo.is_matching ? (
                  <div className="text-hibye-80 text-sm">Please wait for reply.</div>
                ) : (
                  <input type="date" className="text-hibye-100 text-sm rounded-2xl border bg-gray-10 pl-3 pr-3" placeholder="YYYY-MM-DD" />
                )}
              </div>

              {isUsernameValid ? <div className="mb-10" /> : <div className="text-hibye-80 text-xs text-center mb-10">Invalid username, Please check again.</div>}
              {/* <div className="text-gray-80 text-sm underline cursor-pointer w-max">Change password</div> */}
              <div className="text-gray-80 text-sm underline cursor-pointer w-max" onClick={deleteId}>
                Delete account
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
