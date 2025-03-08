import sqlite3 from "sqlite3";
import {open} from "sqlite";
import {Database} from "sqlite";

export interface Reservation {
    id: string;
    name: string;
    email: string;
    gender: string;
    reservation_date: string;
    status: string;
}

let db: Database<sqlite3.Database, sqlite3.Statement>;

// inisialisasi database dan buat tabel jika belum ada

async function initDB() {
    db = await open({
        filename: "./reservations.sqlite3",
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        gender TEXT,
        reservation_date TEXT,
        status TEXT
        )`)
}

initDB();