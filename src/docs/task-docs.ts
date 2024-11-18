/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tasks management
 */

/**
 * @swagger
 * /api/tasks/all_tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Fetches all tasks from the database with their subtasks.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value:
 *                   [
 *                     {
 *                       "id": 1,
 *                       "title": "Task 1",
 *                       "task_description": "Description for task 1",
 *                       "task_status": true,
 *                       "user": {
 *                         "id": 1,
 *                         "name": "John Doe",
 *                         "email": "johndoe@example.com",
 *                         "user_password":"PchzDqlRrYZnYjIKv1b7JOIhLsYmXyrVNSM7Ym4U3tbNk0D1ZbD9u"
 *                       },
 *                       "subtasks": [],
 *                     }
 *                   ]
 *       500:
 *         description: An error occurred while fetching all tasks.
 */

/**
 * @swagger
 * /api/tasks/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a task by ID, along with their subtasks.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The task with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value:
 *                   [
 *                     {
 *                       "id": 1,
 *                       "title": "Task 1",
 *                       "task_description": "Description for task 1",
 *                       "task_status": true,
 *                       "user": {
 *                         "id": 1,
 *                         "name": "John Doe",
 *                         "email": "johndoe@example.com",
 *                         "user_password":"PchzDqlRrYZnYjIKv1b7JOIhLsYmXyrVNSM7Ym4U3tbNk0D1ZbD9u"
 *                       },
 *                       "subtasks": [],
 *                     }
 *                   ]
 *       404:
 *         description: Task not found
 *       500:
 *         description: An error occurred while fetching the task.
 */

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     description: Registers a task in the database. The "parentTaskId" field is optional, and serves to inform which is the 'parent task' of the current task. The 'parent task' must be a task related to the currently authenticated user, otherwise the registration does not occur. The "user" field of the task will be automatically filled with the currently authenticated user. Validations - title must be between 1 and 255 characters long | description is optional, but can be up to 500 characters long | status must be a boolean value. By default it is false, but can be set to true. | parentTaskId must be an integer.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               parentTaskId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation errors or user ID mismatch with parent task
 *       404:
 *         description: Parent task not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by ID from database. If the deleted task has subtasks, all subtasks of this task will also be cascaded deleted. A user can only delete a task if this task is related to the user himself, that is, if he himself created it.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: User is not authorized to delete this task
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   patch:
 *     summary: Update an existing task
 *     description: Updates one or more attributes of a task in the database. Also serves to mark or unmark a task as completed. As with the other routes, only the user who created it can update it. Validations - title must be between 1 and 255 characters long | description is optional, but can be up to 500 characters long | status must be a boolean value. By default it is false, but can be set to true | parentTaskId must be an integer.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               parentTaskId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: User is not authorized to update this task
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/filter_by_status:
 *   post:
 *     summary: Filter tasks by status
 *     description: Returns a list of tasks that currently have a status of complete or not (true or false). Validations - status must be a boolean value. By default it is false, but can be set to true.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: List of tasks filtered by status
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

export default{};