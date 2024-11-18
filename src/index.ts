import express from 'express';
import dotenv from 'dotenv';
import "./data-source";
import { user_route } from './routes/user.route';
import { task_route } from './routes/task.route';
import { auth_route } from './routes/auth.route';
import { IsAuthenticated } from './middlewares/isAuthenticated';
import { swaggerSpec, swaggerUi } from './swagger-config';


dotenv.config(); // Carrega as variáveis de ambiente

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api",auth_route);
app.use(IsAuthenticated);
app.use("/api/users",user_route);
app.use("/api/tasks",task_route);

app.listen(Number(process.env.PORT), async() =>{
    console.log(`Server running on port ${process.env.PORT}`);
})