import "../index.css";
import React, { useEffect, useState, useCallback } from "react";
import { Todoinsert } from "./Todoinsert";
import { Todolist } from "./Todolist";
import axios from "axios";
import { useParams } from "react-router-dom";

function TodolistBoard() {
  const [todoList, setTodoList] = useState([{ id: "", contents: "", board_id: "", is_completed: "" }]);
  const [text, setText] = useState("");

  const { boardId } = useParams();

  // input 값 가져오기
  const onChange = (e) => {
    setText(() => e.target.value);
  };

  // 원래 이럼. 처음한번만 작동하게 만들어서

  //투두리스트 가져오는 get
  const getTodos = useCallback(() => {
    console.log("hi");
    axios
      .get(`http://localhost:80/todos/${boardId}`)
      .then((res) => {
        console.log(res.data.data);
        setTodoList(res.data.data);
      })
      .catch((err) => alert(err));
  }, [boardId]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  //Todoinsert.js의 onPressSubmitButton에서 적용
  const saveTodo = () => {
    axios.post(`http://localhost:80/todo/${boardId}`, { contents: text }).then((res) => console.log(res));
  };

  const deleteTodo = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:80/todo/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  // 다음은 더미데이터
  //   const [todoList, setTodoList] = useState([
  //     {
  //       id: 1,
  //       text: "No.1 Coding after work",
  //       checked: false,
  //       deleted: false,
  //     },
  //     {
  //       id: 2,
  //       text: "No.2 Go jogging together",
  //       checked: false,
  //       deleted: false,
  //     },
  //     {
  //       id: 3,
  //       text: "No.3 Brunch on Sunday",
  //       checked: true,
  //       deleted: false,
  //     },
  //   ]);

  return (
    <div className="bg-hibye-10">
      {/* 전체를 감싸는 컨테이너 */}
      <div className="inner h-fit bg-hibye-10 pt-12 pl-5 pb-12 pr-5">
        {/* boardname과 board desc */}
        <div className="text-lg text-hibye-80 font-bold leading-5 w-100 h-5 top-20 left-20 pt-6">Pink Bucket List</div>
        <div className="text-sm text-gray-80 font-normal leading-6 w-120 h-6 top-20 left-20 pt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        {/* newTodolistItem 입력란과 Add버튼  */}
        <Todoinsert todoList={todoList} setTodoList={setTodoList} saveTodo={saveTodo} setText={setText} text={text} onChange={onChange} />
        {/* todo list container */}
        <Todolist todoList={todoList} checkedList={false} deleteTodo={deleteTodo} />
        {/* <Todolist todoList={todoList} setTodoList={setTodoList} checkedList={true} /> */}
      </div>
    </div>
  );
}

export default TodolistBoard;
