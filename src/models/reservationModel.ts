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

// fungsi untuk menyimpan reservasi
export async function insertReservation(reservation: Reservation) {
    const {id, name, email, gender, reservation_date, status} = reservation;
    await db.run(`INSERT INTO reservations (id, name, email, gender, reservation_date, status) VALUES (?, ?, ?, ?, ?, ?)`, 
        id, name, email, gender, reservation_date, status
    );
}

// fungsi untuk mendapatkan jumlah total reservasi
export async function getTotalReservations(): Promise<number> {
    const row = await db.get<{count: number}>(`SELECT COUNT (*) as count FROM reservations`);
    return row?.count || 0;
}

// fungsi untuk mendapatkan data reservasi berdasarkan ID
export async function getReservationById(id:string): Promise<Reservation | undefined> {
    return await db.get<Reservation>(
        `SELECT * FROM reservations WHERE id = ?`, id
    );
};

// fungsi untuk memperbarui status reservasi berdasarkan id
export async function updateReservationStatusById(id:string, status:string): Promise<void> {
    await db.run(`UPDATE reservations SET status = ? WHERE id = ?`, status, id)
}