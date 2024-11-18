/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - user_password
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         user_password:
 *           type: string
 *           description: The password of the user (hashed)
 *         tasks:
 *           type: array
 *           description: A list of tasks assigned to the user
 *           items:
 *             $ref: '#/components/schemas/Task'
 */