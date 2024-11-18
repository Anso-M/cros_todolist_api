import { check } from "express-validator";

export const update_user_validation = () => {
    return [
        check("name").optional().isString().withMessage("Invalid value. Name should be a text.")
            .isLength({ min: 1, max: 255 }).withMessage("Username should be between 1 and 255 characters."),
        check("email").optional().isEmail().withMessage("Invalid email format."),
        check("password").optional().isLength({ min: 6, max: 255 }).withMessage("Password should be between 6 and 255 characters.")
    ];
};