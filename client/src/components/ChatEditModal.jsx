import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/modules/chatEditModal";
import CancelBtn from "./Button/CancelBtn";
import getByteLength from "../utils/getByteLength";
import axios from "axios";
import swal from "sweetalert2";

export default function ChatEditModal() {
  const dispatch = useDispatch();
  const { isOpen, post_id, post_contents } = useSelector((state) => state.chatEditModal);

  const [contents, setContents] = useState("");
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  useEffect(() => {
    setContents(post_contents);
  }, [post_contents]);

  const refContents = useRef(null);

  const [valid, setValid] = useState({ isValid: true });

  const close = () => {
    setContents(post_contents);
    setValid((state) => ({ ...state, isValid: true }));
    dispatch(closeModal());
  };

  const save = () => {
    const contentsByte = getByteLength(contents);
    if (contentsByte < 1 || contentsByte > 150 || /\s{2,}|^\s|\s$/g.test(contents)) {
      setValid((state) => ({ ...state, isValid: false }));
      refContents.current.focus();
      return;
    }

    setValid((state) => ({ ...state, isValid: true }));

    axios
      .patch(`${process.env.REACT_APP_API_URL}/post/${post_id}`, {
        title: null,
        contents: contents,
      })
      .then(() => {
        swal
          .fire({
            title: "Chat modification success",
            text: "",
            icon: "success",
            confirmButtonColor: "#D70569",
          })
          .then(() => {
            close();
          });
      })
      .catch((err) =>
        swal.fire({
          title: "Chat modification failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        }),
      );
  };

  return (
    <>
      {isOpen ? (
        <div className="w-screen h-full justify-center items-center absolute z-50 block">
          <div className="bg-hibye-10 sticky top-56 p-6 border border-solid border-hibye-80 rounded-2xl inner">
            <div className="flex justify-between">
              <div className="font-bold text-lg text-hibye-80">Chat Editor</div>
              <div onClick={close} className="flex justify-end mb-4">
                <CancelBtn />
              </div>
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                value={contents}
                placeholder="Enter Chat here"
                onChange={onChangeContents}
                className="flex-grow rounded-2xl border bg-gray-10 pl-3 pr-3 text-gray-80 mr-4 mb-4"
                ref={refContents}
              />
              <div className="flex-grow-0 button--pink" onClick={save}>
                Save
              </div>
            </div>
            {valid.isValid ? null : <div className="text-hibye-80 text-sm text-center mb-2">Invalid chat. Please check again.</div>}
          </div>
        </div>
      ) : null}
    </>
  );
}
