// backend/database.js

import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js';


export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://freebet_db_bkri_user:wmVPq6fyclMBzQpzNGjPUGonzZQiJYvJ@dpg-cts9ult2ng1s73bvl3lg-a.frankfurt-postgres.render.com/freebet_db_bkri',
    ssl: {
        rejectUnauthorized: false
    },
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,

});



