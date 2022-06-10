import React from "react";
import "./ToDoList.css";

interface TodoListProps {
  items: { id: string; text: string }[];
  deleteTodoHandler: (id: string) => void;
}

const ToDoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => {
        return (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => props.deleteTodoHandler(todo.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
