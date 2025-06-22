import { data } from './data/data.js';
import { pool } from './db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    news TEXT NOT NULL,
    description TEXT
  );
`;

const insertQuery = `
  INSERT INTO news (id, date, title, news, description)
  VALUES ($1, $2, $3, $4, $5)
`;

async function initDb() {
  try {
    await pool.query(createTableQuery);

    for (const item of data) {
      await pool.query(insertQuery, [
        item.id,
        item.date,
        item.title,
        item.news,
        item.description,
      ]);
    }

    console.log('Таблица создана и данные загружены');
    process.exit(0);
  } catch (err) {
    console.error('Ошибка при инициализации:', err);
    process.exit(1);
  }
}

initDb();
