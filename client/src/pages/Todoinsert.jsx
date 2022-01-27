import React, { useState } from "react";
import "../index.css";

export function Todoinsert({ todoList, setTodoList, saveTodo, onChange, text, setText }) {
  // 버튼 누르면 saveTodos 실행
  const onPressSubmitButton = (e) => {
    e.preventDefault();
    saveTodo();

    // //TodolistItem에 값 추가
    // const newTodoList = todoList.concat({
    //   id: todoList.length,
    //   text,
    //   checked: false,
    //   deleted: false,
    // });
    // setTodoList(newTodoList);

    // input 입력값 초기화
    setText(() => "");
  };

  return (
    <form onSubmit={onPressSubmitButton} className="flex flex-wrap w-149 pt-12 justify-center">
      <input
        type="text"
        name="todoItem"
        value={text}
        className="bg-gray-10 rounded-2xl text-sm font-medium text-grey-darkest w-10/12 h-8 top-325 left-332 py-2 px-3 mr-4"
        placeholder="What's your plan?"
        onChange={onChange}
      />
      <button type="submit" className="button--pink">
        Add
      </button>
    </form>
  );
}
