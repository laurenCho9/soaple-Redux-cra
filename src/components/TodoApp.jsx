import { useState } from "react";

function TodoApp(props) {
  const {
    // Redux state
    todoItems,
    //Redux dispatch
    addTodo,
    removeTodo,
    removeAll,
  } = props;

  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <h3>오늘 할 일</h3>
      <ul>
        {todoItems.map((todoItem, index) => {
          return <li key={index}>{todoItem}</li>;
        })}
      </ul>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
        />
        <button
          onClick={() => {
            addTodo(newTodo);
            setNewTodo("");
          }}
        >
          할 일 추가
        </button>
        <button onClick={removeTodo}>할 일 삭제</button>
        <button onClick={removeAll}>모두 삭제</button>
      </div>
    </div>
  );
}

export default TodoApp;
