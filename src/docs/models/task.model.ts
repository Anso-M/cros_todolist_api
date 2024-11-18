/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *        - title
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *         status:
 *           type: boolean
 *           description: The status of the task (true for completed, false for pending). Default value is false
 *         user:
 *           $ref: '#/components/schemas/User'
 *         subtasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *         parentTaskId:
 *           $ref: '#/components/schemas/Task'
 *         
 */