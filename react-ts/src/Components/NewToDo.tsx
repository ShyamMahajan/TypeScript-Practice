import React, { useRef } from "react";
import "./NewToDo.css";

interface NewTodoProps {
  addTodoHandler: (todo: string) => void;
}

const NewToDo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.addTodoHandler(enteredText);
    textInputRef.current!.value = "";
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type={"text"} id="todo-text" ref={textInputRef}></input>
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewToDo;
