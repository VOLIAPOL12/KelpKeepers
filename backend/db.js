import pg from 'pg'; 
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

console.log(' Loaded DB env variables:', {
    PGUSER, PGHOST, PGDATABASE, PGPASSWORD: PGPASSWORD ? '********' : 'undefined', PGPORT
  });

export const pool = new pg.Pool({
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    host: PGHOST,
    ssl: {
        rejectUnauthorized:false, // Required for DigitalOcean Managed PostgreSQL
        }
    })
