// IUser
import { ITask } from "./task.interface";

export interface IUser {
  id?: number;
  username: string;
  email: string;
  user_password: string;
  tasks?: ITask[];
}