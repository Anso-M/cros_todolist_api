import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import dotenv from 'dotenv';

dotenv.config();

export const IsAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers["authorization"]) {
        res.status(400).json({ success: false, message: "No authorization headers available." });
        return; // `return` para finalizar a função
    }

    const header: any = req.headers["authorization"];
    const method: string = header?.split(" ")[0];
    const token: string = header?.split(" ")[1];

    if (!method || !token) {
        res.status(400).json({ success: false, message: "Invalid auth header." });
        return;
    } else if (method !== "Bearer") {
        res.status(400).json({ success: false, message: "Invalid auth method." });
        return;
    }

    let tokenbody: any;

    try {
        tokenbody = jwt.verify(token, String(process.env.JWT_SECRET));
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid auth token." });
        return;
    }

    if (!tokenbody.userId) {
        res.status(400).json({ success: false, message: "Invalid auth token." });
        return;
    }

    const user = await User.findOne({ where: { id: tokenbody.userId } });

    if (!user) {
        res.status(400).json({ success: false, message: "User not found by token." });
        return;
    } else {
        req.User_data = user;
        next(); // `next()` para passar para o próximo middleware
    }
};