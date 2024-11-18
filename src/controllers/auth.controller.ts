import { Request, Response } from "express";
import { s_login, s_signup } from "../services/auth.service";
import { validationResult } from "express-validator";

export const login = async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors."
        });
        return;
    }

    
    try {
        const result = await s_login(req, res);

        if (result.message === "Login failed. Invalid credentials.") {
            res.status(401).json(result); // 401 se as credenciais forem inválidas
        } else {
            res.status(200).json(result); // 200 se o login for bem-sucedido
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during login.",
            error: error.message
        });
    }
}

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors."
        });
        return;
    }

    try {
        const result = await s_signup(req, res);

        if (result.message === "Account already exists.") {
            res.status(400).json(result);  // 400 se a conta já existir
        } else if (result.message === "Account created successfully.") {
            res.status(201).json(result);  // 201 se a conta for criada com sucesso
        } else {
            res.status(500).json(result);  // 500 em caso de erro inesperado
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during account creation.",
            error: error.message
        });
    }
}