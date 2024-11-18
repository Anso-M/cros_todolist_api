import { Request, Response } from "express";
import { s_all_tasks, s_get_task, s_create_task, s_delete_task, s_update_task, s_filter_tasks_by_status } from "../services/task.service";
import { validationResult } from "express-validator";

export const all_tasks = async (req: Request, res: Response) => {
    try {
        const result = await s_all_tasks(req, res);
        if (!result.length) {
            res.status(204).json({ message: "No tasks found." }); // 204 se não houver tasks
        } else {
            res.status(200).json(result); // 200 se houver tasks
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching all tasks.",
            error: error.message
        });
    }
}

export const get_task = async (req: Request, res: Response) => {
    try {
        const result = await s_get_task(req, res);
        if (result === "Task not found.") {
            res.status(404).json({ message: result }); // 404 se a tarefa não for encontrada
        }
        else{
            res.status(200).json(result); // 200 se a tarefa for encontrada
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching the task.",
            error: error.message
        });
    }
}

export const create_task = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors." // 400 se houver erros de validação
        });
        return;
    }

    try {
        const result = await s_create_task(req, res);
        if (result.message == "Task created successfully."){
            res.status(201).json(result);
        }
        else if (result.message == "User ID does not match the parent task's user."){
            res.status(400).json(result); // 201 para criação bem-sucedida
        } else {
            res.status(404).json(result);
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the task.",
            error: error.message
        });
    }
}

export const delete_task = async (req: Request, res: Response) => {
    try {
        const result = await s_delete_task(req, res);
        if (result.message == "Task not found.") {
            res.status(404).json(result); // 404 se a tarefa não for encontrada
        } else if (result.message == "User is not authorized to delete this task."){
            res.status(400).json(result);
        }
        else{
            res.status(200).json(result); // 200 se a tarefa for deletada com sucesso
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting the task.",
            error: error.message
        });
    }
}

export const update_task = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors." // 400 se houver erros de validação
        });
        return;
    }

    try {
        const result = await s_update_task(req, res);
        if (result.message === "Task not found.") {
            res.status(404).json(result); // 404 se a tarefa não for encontrada
        } else if (result.message == "User is not authorized to update this task." ||
            result.message == "User is not authorized to update the parent task.") {
            res.status(400).json(result);
        }
        else{
            res.status(200).json(result); // 200 se a tarefa for atualizada com sucesso
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the task.",
            error: error.message
        });
    }
}

export const filter_tasks_by_status = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "There are some validation errors." // 400 se houver erros de validação
        });
        return;
    }

    try {
        const result = await s_filter_tasks_by_status(req, res);
        res.status(200).json(result); // 200 se a filtragem for bem-sucedida
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while filtering tasks by status.",
            error: error.message
        });
    }
}