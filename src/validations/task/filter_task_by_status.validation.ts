import { check } from "express-validator";

export const filter_tasks_by_status_validation = () => {
    return [
        check('status')
            .exists().withMessage('Status is required.')  // Garante que o status está no corpo
            .isBoolean().withMessage('Status must be a boolean value.') // Garante que o status seja um booleano
    ];
};