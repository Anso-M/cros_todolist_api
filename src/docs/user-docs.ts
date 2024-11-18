/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/all_users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches all users from the database with their tasks.
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             examples:
 *                example1:
 *                    value:
 *                       [
 *                        {
 *                            "id": 8,
 *                            "username": "Anderson",
 *                            "email": "anso@email.com",
 *                            "user_password": "$2a$10$Vcf2XDi5tKZXPIEb/lxcAu4YLEDNygNIxNDvpHOvZPsm/MoOXu1pu",
 *                            "tasks": []
 *                        }
 *                       ]
 *       500:
 *         description: An error occurred while fetching all users.
 */

/**
 * @swagger
 * /api/users/get_user/{id}:
 *   get:
 *     summary: Retrieve a user and tasks by ID
 *     description: Retrieves a user by ID, along with their tasks and subtasks.
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *                example1:
 *                    value:
 *                       [
 *                        {
 *                            "id": 8,
 *                            "username": "Anderson",
 *                            "email": "anso@email.com",
 *                            "user_password": "$2a$10$Vcf2XDi5tKZXPIEb/lxcAu4YLEDNygNIxNDvpHOvZPsm/MoOXu1pu",
 *                            "tasks": []
 *                        }
 *                       ]
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while fetching the user.
 */

/**
 * @swagger
 * /api/users/search:
 *   post:
 *     summary: Search users by name
 *     description: Search users by partial name. Validations - name must be a text and have between 1 and 255 characters.
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name to search for
 *                 example: "ans"
 *     responses:
 *       200:
 *         description: Successfully found matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             examples:
 *                example1:
 *                    value:
 *                       [
 *                        {
 *                            "id": 8,
 *                            "username": "Anderson",
 *                            "email": "anso@email.com",
 *                            "user_password": "$2a$10$Vcf2XDi5tKZXPIEb/lxcAu4YLEDNygNIxNDvpHOvZPsm/MoOXu1pu",
 *                            "tasks": []
 *                        }
 *                       ]
 *       400:
 *         description: No name to search.
 *       500:
 *         description: An error occurred while searching for users.
 */

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a specific user from the database by their ID.
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while deleting the user.
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update user information
 *     description: Updates a user's information by ID. Fields can be updated optionally. The password will be hashed. Validations - name must be a text and have between 1 and 255 characters | email must be in a valid email format | password must have between 6 and 255 characters.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name
 *                 example: "Anderson_upd"
 *               email:
 *                 type: string
 *                 description: The new email
 *                 example: "newanderson@example.com"
 *               password:
 *                 type: string
 *                 description: The new password
 *                 example: "newpassword"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: No valid fields provided for update
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while updating the user.
 */
export default {};
