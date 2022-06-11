import { Router } from "express";
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "../controllers/todos"
const router = Router()

router.post("/", createTodo)
router.get("/", getAllTodos)
router.patch("/:id", updateTodo)
router.delete("/:id", deleteTodo)

export default router;