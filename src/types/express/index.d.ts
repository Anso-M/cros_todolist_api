import { User } from "../../entities/user.entity";
import express from 'express';

declare global{
    namespace Express{
        interface Request{
            User_data?: User;
        }
    }
}

export{};