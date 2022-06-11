import express, {Request, Response, NextFunction} from "express"
import TodoRoutes from "./routes/todos";
import { json } from "body-parser"
const app = express()

app.use(json())
app.use("/todo", TodoRoutes)

// Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
     res.status(500).json({message : err.message})
})

app.listen(3000, () => console.log("running at 3000"))