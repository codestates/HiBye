import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modules/privateBoardCreateModal";
import CancelBtn from "../Button/CancelBtn";
import category from "../../utils/category";
import theme from "../../utils/theme";
import getByteLength from "../../utils/getByteLength";
import axios from "axios";
import swal from "sweetalert2";

export default function PrivateBoardCreateModal({ couple_id }) {
  const dispatch = useDispatch();

  // Create Modal 열림 여부
  const isOpen = useSelector((state) => state.privateBoardCreateModal.isOpen);

  // Board 이름
  const [name, setName] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  // Board 설명
  const [desc, setDesc] = useState("");
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  // 유효성 여부
  const [valid, setValid] = useState({ isValid: true, reason: "" });

  // Create Modal 닫기 액션
  const close = () => {
    setName("");
    setDesc("");
    setValid((state) => ({ ...state, isValid: true, reason: "" }));
    dispatch(closeModal());
  };

  // 참조
  const refName = useRef(null);
  const refCategory = useRef(null);
  const refTheme = useRef(null);
  const refDesc = useRef(null);

  // 저장
  const save = () => {
    // 유효성 검사
    const nameByte = getByteLength(name);
    if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(name)) {
      setValid((state) => ({ ...state, isValid: false, reason: "name" }));
      refName.current.focus();
      return;
    }
    if (getByteLength(desc) > 150 || /\s{2,}|^\s|\s$/gm.test(desc)) {
      setValid((state) => ({ ...state, isValid: false, reason: "description" }));
      refDesc.current.focus();
      return;
    }

    // 보드 생성
    axios
      .post(`${process.env.REACT_APP_API_URL}/board/${couple_id}`, {
        name: name,
        category: refCategory.current.value,
        theme: refTheme.current.value,
        desc: desc,
      })
      .then(() => {
        swal
          .fire({
            title: "Board creation success",
            text: `"${name}" has been created`,
            icon: "success",
            confirmButtonColor: "#D70569",
          })
          .then(() => {
            close();
            window.location.reload();
          });
      })
      .catch((err) =>
        swal.fire({
          title: "Board creation failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        }),
      );
  };

  const nameStyle = "text-hibye-60 font-bold mb-2 text-lg";
  const inputStyle = "w-80 mb-4 p-2 text-hibye-100 bg-gray-10 rounded-lg";

  return (
    <>
      {isOpen ? (
        <div className="w-screen h-screen flex justify-center items-center absolute -translate-y-20 z-50">
          <div className="bg-hibye-10 fixed p-6 border-solid border-hibye-80 border">
            <div onClick={close} className="flex justify-end">
              <CancelBtn />
            </div>
            <div className={nameStyle}>Name</div>
            <input type="text" value={name} placeholder="Enter board name" onChange={onChangeName} className={inputStyle} ref={refName} />
            <div className={nameStyle}>Category</div>
            <select className={inputStyle} ref={refCategory}>
              {category.map((option, idx) => (
                <option value={option} key={idx}>
                  {option}
                </option>
              ))}
            </select>
            <div className={nameStyle}>Theme</div>
            <select className={inputStyle} ref={refTheme}>
              {theme.map((option, idx) => (
                <option value={option} key={idx}>
                  {option}
                </option>
              ))}
            </select>
            <div className={nameStyle}>Description</div>
            <textarea value={desc} onChange={onChangeDesc} className={`${inputStyle} h-24`} ref={refDesc} placeholder="Write a description of the board" />
            {valid.isValid ? null : <div className="text-hibye-80 text-sm text-center mb-2">Invalid {valid.reason}. Please check again.</div>}
            <div className="button--pink--save mt-4" onClick={save}>
              Save
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
