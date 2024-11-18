import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const s_login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const check_user = await User.findOne({ where: { email: email } });

        if (check_user && await bcrypt.compareSync(password, check_user.user_password)) {
            const token = jwt.sign({ userId: check_user.id }, String(process.env.JWT_SECRET), { expiresIn: '3600s' });

            return {
                user: check_user,
                token: token,
                message: "Login successful."
            };
        } else {
            return {
                user: null,
                token: null,
                message: "Login failed. Invalid credentials."
            };
        }
    } catch (error: any) {
        console.error(error);
        return {
            message: "An error occurred during login.",
            error: error.message
        };
    }
}

export const s_signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const check_user = await User.findOne({ where: { email: email } });

        if (check_user) {
            return {
                message: "Account already exists.",
                state: false
            };
        } else {
            const hashedPassword = await bcrypt.hashSync(password, 10);

            const user = await User.save({
                username: name,
                email: email,
                user_password: hashedPassword
            });

            const token = jwt.sign({ userId: user.id }, String(process.env.JWT_SECRET), { expiresIn: '3600s' });

            return {
                user: user,
                token: token,
                message: "Account created successfully."
            };
        }
    } catch (error: any) {
        console.error(error);
        return {
            message: "An error occurred during account creation.",
            error: error.message
        };
    }
}