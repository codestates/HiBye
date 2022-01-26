import Spinner from "./Spinner";
import EditBtn from "./Button/EditBtn";
import CancelBtn from "./Button/CancelBtn";
import axios from "axios";
import swal from "sweetalert2";
import { useState, useRef } from "react";
import CancelBtn2 from "./Button/CancelBtn2";
import CheckBtn from "./Button/CheckBtn";
import getByteLength from "../utils/getByteLength";

export default function Chats({ posts, user_id }) {
  const deletePost = (post_id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/post/${post_id}`)
            .then(() => {
              swal.fire({
                title: "Chat delete success",
                text: "",
                icon: "success",
                confirmButtonColor: "#D70569",
              });
            })
            .catch((err) => {
              swal.fire({
                title: "Chat delete failed",
                text: `${err}`,
                icon: "error",
                confirmButtonColor: "#D70569",
              });
            });
        }
      });
  };

  const refInput = useRef(null);

  const [edit, setEdit] = useState({ post_id: "", post_contents: "", isEdit: false });

  const [editContents, setEditContents] = useState("");
  const onChangeEditContents = (e) => {
    setEditContents(e.target.value);
  };

  const editOn = (post_id, post_contents) => {
    setEdit((state) => ({ ...state, post_id: post_id, post_contents: post_contents, isEdit: true }));
    setEditContents(post_contents);
  };

  const editOff = () => {
    setEditContents(edit.post_contents);
    setValid((state) => ({ ...state, isValid: true }));
    setEdit((state) => ({ ...state, post_id: "", post_contents: "", isEdit: false }));
  };

  const [valid, setValid] = useState({ isValid: true });

  const editCheck = async () => {
    const contentsByte = getByteLength(editContents);
    if (contentsByte < 1 || contentsByte > 150 || /\s{2,}|^\s|\s$/g.test(editContents)) {
      setValid((state) => ({ ...state, isValid: false }));
      refInput.current.focus();
      return;
    }

    setValid((state) => ({ ...state, isValid: true }));

    await axios
      .patch(`${process.env.REACT_APP_API_URL}/post/${edit.post_id}`, {
        title: null,
        contents: editContents,
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
            editOff();
          });
      })
      .catch((err) => {
        swal.fire({
          title: "Chat modification failed",
          text: `${err}`,
          icon: "error",
          confirmButtonColor: "#D70569",
        });
      });
  };

  return (
    <>
      {posts.loading || posts.error ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : posts.data.data.length === 0 ? (
        <div className="p-6 text-center text-lg text-gray-80 mb-4">There's no chat yet. Let's start chatting!</div>
      ) : (
        posts.data.data.map((post) => (
          <div key={post.id} className="flex justify-between gap-5">
            <div className="border border-solid border-hibye-80 rounded-2xl m-2 p-5 flex-grow">
              <div className="flex mb-4 justify-between">
                <div className="flex gap-4 ">
                  <div className="font-bold text-lg text-hibye-80">{post.User.username}</div>
                  <div className="self-center text-xm text-gray-40">{post.updated_at}</div>
                </div>
                <div className="flex justify-between self-center gap-2">
                  {edit.isEdit && edit.post_id === post.id ? (
                    <div className="flex gap-1">
                      <div onClick={editCheck}>
                        <CheckBtn />
                      </div>
                      <div onClick={editOff}>
                        <CancelBtn2 />
                      </div>
                    </div>
                  ) : post.user_id === user_id ? (
                    <div className="self-center" onClick={() => editOn(post.id, post.contents)}>
                      <EditBtn />
                    </div>
                  ) : null}
                  {post.user_id === user_id ? (
                    <div className="self-center" onClick={() => deletePost(post.id)}>
                      <CancelBtn />
                    </div>
                  ) : null}
                </div>
              </div>
              {edit.isEdit && edit.post_id === post.id ? (
                <>
                  <input
                    className="w-full rounded-2xl border bg-gray-10 pl-3 pr-3 text-gray-80"
                    type="text"
                    onChange={onChangeEditContents}
                    placeholder="Enter Chat here"
                    value={editContents}
                    ref={refInput}
                  />
                  {valid.isValid ? null : <div className="text-hibye-80 text-sm text-center mb-2 mt-2">Invalid chat. Please check again.</div>}
                </>
              ) : (
                <div className="text-xm text-gray-80">{post.contents}</div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}
