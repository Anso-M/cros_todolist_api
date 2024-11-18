import express from "express";
import { all_tasks, create_task, delete_task, filter_tasks_by_status, get_task, update_task } from "../controllers/task.controller";
import { create_task_validation } from "../validations/task/create_task.validation";
import { update_task_validation } from "../validations/task/update_task.validation";
import { filter_tasks_by_status_validation } from "../validations/task/filter_task_by_status.validation";

export const task_route = express.Router();

task_route.get("/all_tasks", all_tasks);
task_route.get("/task/:id", get_task);
task_route.post("/create", create_task_validation(), create_task);
task_route.delete("/delete/:id", delete_task);
task_route.patch("/update/:id", update_task_validation(), update_task);
task_route.post("/filter_by_status", filter_tasks_by_status_validation(), filter_tasks_by_status);