import React, { useState } from "react";
import ToDoList from "./Components/ToDoList";
import NewToDo from "./Components/NewToDo";
import { Todo } from "./Models/ToDo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todo: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: todo },
    ]);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <NewToDo addTodoHandler={addTodoHandler} />
      <ToDoList items={todos} deleteTodoHandler={deleteTodoHandler} />
    </div>
  );
};

export default App;
