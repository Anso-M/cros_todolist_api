import { Request, Response } from "express";
import { s_all_users, s_user, s_search_user, s_delete_user, s_update_user } from "../services/user.service";
import { validationResult } from "express-validator";

export const all_users = async (req: Request, res: Response) => {
    try {
        const result = await s_all_users(req, res);
        res.status(200).json(result);  // 200 se tudo correr bem
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching all users.",
            error: error.message
        });
    }
}

export const get_user = async (req: Request, res: Response) => {
    try {
        const result = await s_user(req, res);
        if (result === "User not found.") {
            res.status(404).json({ message: result });  // 404 se o usuário não for encontrado
        }
        else{
            res.status(200).json(result);  // 200 se o usuário for encontrado
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching the user.",
            error: error.message
        });
    }
}

export const search_user = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors."  // 400 se houver erros de validação
        });
        return;
    }

    try {
        const result = await s_search_user(req, res);
        if (result === "No name to search.") {
            res.status(400).json({ message: result });  // 400 se não houver nome para pesquisar
        }
        else{
            res.status(200).json(result);  // 200 se a pesquisa for realizada com sucesso
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while searching for users.",
            error: error.message
        });
    }
}

export const delete_user = async (req: Request, res: Response) => {
    try {
        const result = await s_delete_user(req, res);
        if (result === "User not found.") {
            res.status(404).json({ message: result });  // 404 se o usuário não for encontrado
        }
        else{
            res.status(200).json({ message: "User deleted successfully." });  // 200 se o usuário for deletado com sucesso
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting the user.",
            error: error.message
        });
    }
}

export const update_user = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors."  // 400 se houver erros de validação
        });
        return
    }

    try {
        const result = await s_update_user(req, res);
        if (result === "User not found.") {
            res.status(404).json({ message: result });  // 404 se o usuário não for encontrado
        } else if (result === "No valid fields provided for update.") {
            res.status(400).json({ message: result });  // 400 se não houver campos válidos para atualizar
        } else if (result == "Email already in use."){
            res.status(400).json({message: result});
        }
        else{
            res.status(200).json({ message: "User updated successfully." });  // 200 se o usuário for atualizado com sucesso
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the user.",
            error: error.message
        });
    }
}