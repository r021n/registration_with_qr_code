import {Request, Response} from "express";
import { getTotalRegistrations } from "../models/database.model";

export const showHomePage = (req: Request, res: Response) => {
    const totalRegistrations = getTotalRegistrations();
    res.render("home", {totalRegistrations});
}