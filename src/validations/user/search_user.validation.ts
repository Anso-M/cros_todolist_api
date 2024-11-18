import { check } from "express-validator";

export const search_user_validation = () => {
    return [
        check("name").exists().withMessage("Name is required for search.").isString().withMessage("Invalid value. Name should be a text.")
            .isLength({ min: 1, max: 255 }).withMessage("Username should be between 1 and 255 characters.")
    ];
};