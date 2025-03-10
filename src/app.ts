import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();

// parsing JSON dan URL-encoded payload
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static file dari folder public
app.use(express.static(path.join(__dirname, "public")));

// gunakan route yang sudah dibuat
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
})