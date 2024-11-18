import { check } from "express-validator";

export const signup_validation=()=>{
    return [
        check("name").exists().withMessage("Name is required.").isString().withMessage("Invalid value. Name should be a text.").
        isLength({min: 1, max: 255}).withMessage("Name should be between 1 and 255 characters."),
        check("email").isEmail().withMessage("Invalid email format."),
        check("password").exists().withMessage("Password is required.").
        isLength({min: 6, max:255}).withMessage("Password should be between 6 and 255 characters.")
    ];
}