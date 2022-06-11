import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const Todos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  Todos.push(newTodo);
  res.status(201).json({ message: "todo added successfully", todo: newTodo });
};

export const getAllTodos: RequestHandler = (req, res, next) => {
  res.status(202).json({ todos: Todos });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const id = (req.params as { id: string }).id;
  const todo = Todos.find((i) => i.id === id);
  if (todo) {
    todo.text = (req.body as { text: string }).text;
    res.status(202).json({ message: "todo updated", todo: { todo } });
  } else {
    throw new Error("Could not find todo");
  }
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = (req.params as { id: string }).id;
  const todoIndex = Todos.findIndex((i) => i.id === id);
  if (todoIndex < 0) {
    throw new Error("Could not find todo");
  }

  Todos.splice(todoIndex, 1);
  res.json({ message: "Todo deleted" });
};
