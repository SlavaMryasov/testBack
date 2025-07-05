import { data } from './data/data.js';
import { pool } from './db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    news TEXT NOT NULL,
    description TEXT,
    "imageUrl" TEXT,
    route TEXT
  );
`;

const alterTableQuery = `
  ALTER TABLE news ADD COLUMN IF NOT EXISTS route TEXT;
`;

const insertQuery = `
  INSERT INTO news (id, date, title, news, description, "imageUrl", route)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

async function initDb() {
  try {
    await pool.query('DROP TABLE IF EXISTS news');
    await pool.query(createTableQuery);
    await pool.query(alterTableQuery); 
    await pool.query('SET search_path TO public');
    await pool.query('DELETE FROM news');
    
    for (const item of data) {
      await pool.query(insertQuery, [
        item.id,
        item.date,
        item.title,
        item.news,
        item.description,
        item.imageUrl ?? null,
        item.route ?? null,
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
