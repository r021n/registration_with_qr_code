import Database from "better-sqlite3";
import {v4 as uuidv4} from "uuid";

const db = new Database("database.db");

// initialize the database
db.exec(`CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    jenis_kelamin TEXT NOT NULL,
    tanggal_reservasi TEXT NOT NULL
    )`
);

export const createRegistration = (data: {
    nama: string, 
    email: string, 
    jenis_kelamin: string, 
    tanggal_reservasi: string
}) => {
    const id = uuidv4();
    const stmt = db.prepare(`INSERT INTO registrations VALUES (?, ?, ?, ?, ?)`);
    stmt.run(id, data.nama, data.email, data.jenis_kelamin, data.tanggal_reservasi);
    return id;
};

export const getTotalRegistrations = (): number => {
    try {
        const stmt = db.prepare(`SELECT COUNT(*) as total FROM registrations`);
        const result = stmt.get() as {total: number};
        return result.total;
    } catch (error) {
        console.error("Error getting total registrations: ", error);
        return 0;
    }
}