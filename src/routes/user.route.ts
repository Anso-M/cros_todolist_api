import express from "express";
import { all_users, get_user, search_user, delete_user, update_user } from "../controllers/user.controller";
import { search_user_validation } from "../validations/user/search_user.validation";
import { update_user_validation } from "../validations/user/update_user.validation";

export const user_route = express.Router();

user_route.get("/all_users", all_users)
user_route.get("/get_user/:id", get_user);
user_route.post("/search", search_user_validation(), search_user);
user_route.delete("/delete/:id", delete_user);
user_route.patch("/update/:id", update_user_validation(), update_user);