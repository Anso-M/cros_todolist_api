import { check } from "express-validator";

export const create_task_validation = () => {
    return [
        check("title")
            .exists().withMessage("Title is required.")
            .isLength({ min: 1, max: 255 }).withMessage("Title should be between 1 and 255 characters."),
        check("description")
            .optional()
            .isLength({ max: 500 }).withMessage("Description should not exceed 500 characters."),
        check("status")
            .optional()
            .isBoolean().withMessage("Status must be a boolean value."),
        check("parentTaskId")
            .optional()
            .isInt().withMessage("Parent Task ID must be an integer.")
        
    ];
};