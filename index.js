import cors from "cors";
import crypto from "crypto";
import express from "express";
import { data } from "./data/data.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Server was start");
  });

app.get("/api/news", (req, res) => {
  res.status(200).json({
    message: "Список новостей успешно получен",
    data,
  });
});

app.post("/api/news", (req, res) => {
  const { date, title, news } = req.body;

  const newItem = {
    id: crypto.randomUUID(),
    date,
    title,
    news,
  };

  data.push(newItem);

  res.status(201).json({
    message: "Новость успешно добавлена",
    data: newItem,
  });
});

app.delete("/api/news", (req, res) => {
  const { id } = req.body;

  const index = data.findIndex(item => item.id === id);
  const removed = data.splice(index, 1);

  res.status(200).json({
    message: "Новость удалена",
    removed: removed[0] ?? null,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server was start: http://localhost:${PORT}`);
});
