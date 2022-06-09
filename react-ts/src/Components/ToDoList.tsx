import React from "react";

const ToDoList: React.FC = () => {
  const todos = [
    {
      id: "t1",
      text: "finish the course!",
    },
  ];
  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.text}</li>;
      })}
    </ul>
  );
};

export default ToDoList
