import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readTodo, writeTodo } from "./src/todo.controller.js";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const router = express.Router();
const Port = 5000;

app.use(cors());
app.use(express.json());

const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server Healthy" });
});

app.get("/todos", async (req, res) => {
  const todos = await readTodo();
  res.status(200).json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const todos = await readTodo();

  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  todos.push(newTodo);
  await writeTodo(todos);
  console.log("Write completed");

  res.status(201).json(newTodo);
});
app.listen(Port, "0.0.0.0", () => {
  console.log("Server running on port", Port);
});
