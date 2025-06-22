import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'admin',
  host: 'dpg-d1c5hbgdl3ps73famolg-a.pg.render.com',
  database: 'newHub',
  password: 'EqoVoukeD2O7JaORJH6uDCrwMynZkXFh',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});