import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { ITask } from '../interfaces/task.interface';

@Entity('tasks')
export class Task extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true, type: 'text' })
  task_description?: string;

  @Column()
  task_status!: boolean;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Task, task => task.parentTask)
  subtasks!: Task[];

  @ManyToOne(() => Task, task => task.subtasks, { onDelete: 'CASCADE' })
  parentTask!: Task;
}