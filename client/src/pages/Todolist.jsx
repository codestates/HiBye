import React from "react";
import { TodolistItem } from "./TodolistItem";
import "../index.css";

export function Todolist({ todoList, deleteTodo }) {
  // todolist container
  return (
    <div className="flex-col pt-12 justify-center">
      {todoList.map((todoItem) => {
        // 삭제한 항목일 경우, 출력하지 않음 (deleted가 true일때) -> axios.delete 연결안돼서 still exists in database
        // if (todoItem.deleted) return null;
        // console.log(todoItem);
        return <TodolistItem key={todoItem.id} todoItem={todoItem} deleteTodo={deleteTodo} />;
      })}
    </div>
  );
}

//(todoItem) =>
//<TodolistItem key={todoItem.id}
// 이렇게 했을때 error -> https://stackoverflow.com/questions/52219852/two-children-with-the-same-key-in-react

// return에서 map 쓰기
// 조건부로 : 배열이 없을때

// map(el => {
//  어쩌구 return ()
// })

// map(el => (
// return 필요 x
// ))
