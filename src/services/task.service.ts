import { Request, Response } from "express";
import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";

export const s_all_tasks = async (req: Request, res: Response) => {
    try {
        const all_tasks = await Task.find({ relations: ['user', 'subtasks'] });
        return all_tasks;
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while fetching all tasks.");
    }
}

export const s_get_task = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    try {
        const task = await Task.findOne({ where: { id: id }, relations: ['user', 'subtasks'] });
        if (task) {
            return task;
        } else {
            return "Task not found.";
        }
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while fetching the task.");
    }
}

export const s_create_task = async (req: Request, res: Response) => {
    const { title, description, status = false, parentTaskId } = req.body;

    try {
        // Extrai o usuário autenticado da requisição
        const user = req.User_data;

        // Verifica se o usuário foi extraído corretamente do token
        if (!user) {
            return { message: "User authentication failed." };
        }

        // Encontra a task pai, se `parentTaskId` for fornecido
        let parentTask: Task | null = null;
        if (parentTaskId) {
            parentTask = await Task.findOne({ where: { id: parentTaskId }, relations: ['user'] });
            if (!parentTask) {
                return { message: "Parent task not found." };
            }

            // Verifica se o `userId` do token é igual ao `userId` da task pai
            if (parentTask.user.id !== user.id) {
                return { message: "User ID does not match the parent task's user." };
            }
        }

        // Cria a task ou subtask
        const task = Task.create({
            title: title,
            task_description: description,
            task_status: status,
            user: user, // Associa automaticamente o usuário autenticado
            parentTask: parentTask ? parentTask : undefined,
        });

        const result = await task.save();
        return { message: "Task created successfully.", task: result };
    } catch (error: any) {
        console.error(error);
        return { message: "An error occurred while creating the task.", error: error.message };
    }
};

export const s_delete_task = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
        const user = req.User_data; // Usuário autenticado extraído da requisição

        if (!user) {
            return { message: "User authentication failed." };
        }

        const task = await Task.findOne({ where: { id: id }, relations: ['user'] });

        if (task) {
            // Verifica se o usuário autenticado é o dono da task
            if (task.user.id !== user.id) {
                return { message: "User is not authorized to delete this task." };
            }

            await Task.remove(task);
            return { message: "Task deleted successfully." };
        } else {
            return { message: "Task not found." };
        }
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while deleting the task.");
    }
};

export const s_update_task = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { title, description, status, parentTaskId } = req.body;

    try {
        const user = req.User_data; // Usuário autenticado extraído da requisição

        if (!user) {
            return { message: "User authentication failed." };
        }

        // Encontra a task que será atualizada
        const task = await Task.findOne({ where: { id: id }, relations: ['user', 'parentTask'] });

        if (!task) {
            return { message: "Task not found." };
        }

        // Verifica se o usuário autenticado é o dono da task
        if (task.user.id !== user.id) {
            return { message: "User is not authorized to update this task." };
        }

        // Atualiza o título e a descrição, se fornecidos
        if (title) task.title = title;
        if (description !== undefined) task.task_description = description;
        if (status !== undefined) task.task_status = status;

        // Se um novo parentTaskId for fornecido, processa a mudança
        if (parentTaskId !== undefined) {
            // Encontra a nova parentTask
            const parentTask = await Task.findOne({ where: { id: parentTaskId }, relations: ['user'] });

            if (!parentTask) {
                return { message: "Parent task not found." };
            }

            // Verifica se o usuário autenticado é o dono da task pai
            if (parentTask.user.id !== user.id) {
                return { message: "User is not authorized to update the parent task." };
            }

            // Atualiza a parentTask da tarefa
            task.parentTask = parentTask;
        }

        // Salva as mudanças
        const result = await task.save();
        return { message: "Task updated successfully.", task: result };
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while updating the task.");
    }
};

export const s_filter_tasks_by_status = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
        const tasks = await Task.find({ where: { task_status: status }, relations: ['user', 'subtasks'] });
        return tasks;
    } catch (error: any) {
        console.error(error);
        throw new Error("An error occurred while filtering tasks by status.");
    }
};