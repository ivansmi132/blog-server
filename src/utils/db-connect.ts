import {Client} from "pg";
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as number | undefined
})

async function connect() {
    try {
        await client.connect();
        console.log("connected to PostgreSQL");
    } catch(error) {
        console.error("Error connecting to PostgreSQL", error);
    }
}

connect();

export function getClient() {
    return client;
}