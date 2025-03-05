import express from "express";
import path from "path";
import homeRouter from "./routes/home.route";
import registrationRouter from "./routes/registration.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./public")));

// view engine
app.set("views", path.join(__dirname, '../views'));
app.set("view engine", "ejs")

// routes
app.use('/', homeRouter);
app.use('/register', registrationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})