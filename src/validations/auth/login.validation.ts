import { check } from "express-validator";

export const login_validation=()=>{
    return [
        check("email").isEmail().withMessage("Invalid email format."),
        check("password").exists().withMessage("Password is required.").
        isLength({min: 6, max:255}).withMessage("Password should be between 6 and 255 characters.")
    ];
}