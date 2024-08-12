import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

database.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 에러:', err);
  }
});

export default database;


