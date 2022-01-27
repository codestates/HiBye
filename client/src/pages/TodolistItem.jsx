import "../index.css";

export function TodolistItem({ todoItem, deleteTodo }) {
  //console.log(todoList);
  //console.log(todoItem);
  const onChangeCheckbox = () => {
    // const newTodoList = todoList.map((item) => ({
    //   ...item,
    //   checked: item.id === todoItem.id ? !item.checked : item.checked,
    // }));
    // 새로운 리스트의 요소 하나하나를 돌려서 원래 리스트의 checked (todoItem.checked로 조회가능) 값 부분을 변경해준다, 새로map돌린리스트의 id와 이전에map돌린리스트의 id값이 같다면 check표시x, 다르다면 check표시 o
    // item은 새 리스트의 요소 하나하나   /  todoItem은 옛날 리스트의 요소 하나하나
    // setTodoList(newTodoList);
  };

  const onClickDeleteButton = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // const newTodoList = todoList.map((item) => ({
      //   ...item,
      //   deleted: item.id === todoItem.id ? true : item.deleted,
      // }));
      // x 버튼 누르면 deleted값이 true가 되도록.
      deleteTodo(id);
      // setTodoList(newTodoList);
    }
  };

  // 위에꺼 안됨. 이것도 안됨.
  // function onClickDeleteButton(id) {
  //   const removeItem = todoList.filter((todo) => {
  //     return todo.id !== id;
  //   });
  //   deleteTodo(id);
  //   setTodoList(removeItem);
  // }

  return (
    <div>
      <div className="flex justify-center">
        {/* todo 각자 컨테이너 */}
        <div className="flex border border-solid m-2 p-5 w-4/6 rounded-2xl border-hibye-80 text-hibye-80 font-bold">
          {/* 1. 완료체크박스 2. 비어있는체크박스 */}
          <input type="checkbox" className="flex-row m-2" checked={todoItem.checked} onChange={onChangeCheckbox}></input>
          <div className={`todoapp__item-ctx ${todoItem.checked ? "todoapp__item-ctx-checked" : ""}`}>{todoItem.text}</div>
          <div>{todoItem.contents}</div>
        </div>

        {/* 삭제버튼. onClick 삭제 */}
        <button type="button" className="x--button" onClick={() => onClickDeleteButton(todoItem.id)}>
          ❌
        </button>
      </div>
    </div>
  );
}
