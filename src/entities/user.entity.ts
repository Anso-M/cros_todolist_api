import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Task } from './task.entity';
import { IUser } from '../interfaces/user.interface';

@Entity('users')
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  user_password!: string;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];
}