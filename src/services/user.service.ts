import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Like } from "typeorm";
import bcrypt from 'bcryptjs';

export const s_all_users = async (req: Request, res: Response) => {
    try {
        return await User.find({ relations: ['tasks.subtasks'] });
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while fetching all users.");
    }
}

export const s_user = async (req: Request, res: Response) => {
    const user_id: any = req.params.id;
    try {
        const user = await User.findOne({ where: { id: user_id }, relations: ['tasks.subtasks'] });

        if (user?.id) {
            return user;
        } else {
            return "User not found.";
        }
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while fetching the user.");
    }
}

export const s_search_user = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        if (name) {
            const users = await User.find({ where: { username: Like(`%${name}%`) }, relations: ['tasks.subtasks'] });
            return users;
        } else {
            return "No name to search.";
        }
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while searching for users.");
    }
}

export const s_delete_user = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
        if (id) {
            const user = await User.findOne({ where: { id: id } });

            if (user) {
                await User.remove(user);
                return true;
            } else {
                return "User not found.";
            }
        } else {
            return "No ID provided for deletion.";
        }
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while deleting the user.");
    }
}

export const s_update_user = async (req: Request, res: Response) => {
    const user_id: any = req.params.id;
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { id: user_id } });
        if (!existingUser) {
            return "User not found.";
        }

        // Verificar se o novo email já existe, caso tenha sido fornecido um novo email
        if (email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists && emailExists.id !== user_id) {
                return "Email already in use.";
            }
        }

        const updatedFields: Partial<User> = {};
        if (name) updatedFields.username = name;
        if (email) updatedFields.email = email;
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            updatedFields.user_password = hashedPassword;
        }

        if (Object.keys(updatedFields).length === 0) {
            return "No valid fields provided for update.";
        }

        const result = await User.update({ id: user_id }, updatedFields);
        return result;
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while updating the user.");
    }
}