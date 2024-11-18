import express from "express";
import { login, signup } from "../controllers/auth.controller";
import { signup_validation } from "../validations/auth/signup.validation";
import { login_validation } from "../validations/auth/login.validation";

export const auth_route = express.Router();

auth_route.post("/login", login_validation(),login);
auth_route.post("/signup",signup_validation(),signup);