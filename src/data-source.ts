import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import dotenv from 'dotenv';

dotenv.config();

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: "todo_app",
    entities: [ User, Task ],
    synchronize: true,
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })