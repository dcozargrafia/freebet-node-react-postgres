import express from 'express';
import cors from 'cors';
import pg from 'pg'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, FRONTEND_URL, PORT } from './config.js';


const app = express();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://freebet_db_bkri_user:wmVPq6fyclMBzQpzNGjPUGonzZQiJYvJ@dpg-cts9ult2ng1s73bvl3lg-a.frankfurt-postgres.render.com/freebet_db_bkri',
    ssl: {
        rejectUnauthorized: false
    },
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,

}

)

app.use(cors({
    origin: FRONTEND_URL
}));

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.send(
        {
            pong: result.rows[0].now,
        }
    )
});

app.get('/casas-apuestas', async (req, res) => {
    const result = await pool.query('SELECT * FROM casas_de_apuestas');
    res.send(
        {
            casas_apuestas: result.rows
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})