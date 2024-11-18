// ITask
import { IUser } from "./user.interface";

export interface ITask {
  id?: number;
  title: string;
  task_description?: string;
  task_status: boolean;
  user?: IUser;
  subtasks?: ITask[];
  parentTask?: ITask;
}