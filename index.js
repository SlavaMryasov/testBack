import cors from "cors";
import crypto from "crypto";
import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("Server was start");
});

app.get("/api/news", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY date DESC");
    res.status(200).json({
      message: "Список новостей успешно получен",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении новостей", error: err });
  }
});

app.post("/api/news", async (req, res) => {
  try {
    const { date, title, news, description } = req.body;
    const id = crypto.randomUUID();
    const result = await pool.query(
      `INSERT INTO news (id, date, title, news, description, imageUrl, route)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, date, title, news, description, route ?? null]
    );

    res.status(201).json({
      message: "Новость успешно добавлена",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при добавлении", error: err });
  }
});

app.delete("/api/news", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не передан id" });
    }

    const result = await pool.query(
      `DELETE FROM news WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Новость не найдена" });
    }

    res.status(200).json({
      message: "Новость удалена",
      removed: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении", error: err });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
