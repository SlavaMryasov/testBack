import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'newhub_user',
  host: 'dpg-d1c5hbgdl3ps73famolg-a.oregon-postgres.render.com',
  database: 'newhub',
  password: 'EqoVoukeD2O7JaORJH6uDCrwMynZkXFh',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});