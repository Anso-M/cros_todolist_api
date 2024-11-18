/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token if the credentials are valid. Validations - email must be in a valid email format | password must be between 6 and 255 characters long.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "UserPassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                     {
 *                      "user": {
 *                          "id": 8,
 *                          "username": "Anso",
 *                          "email": "anso@email.com",
 *                          "user_password": "$2a$10$Vcf2XDi5tKZXPIEb/lxcAu4YLEDNygNIxNDvpHOvZPsm/MoOXu1pu"
 *                      },
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTczMTkzMzcwNSwiZXhwIjoxNzMxOTM3MzA1fQ.XU_w3Bbq4TDA3Y9o3QJ6Inu2L_JzkwXkRXcDT54o4C8",
 *                      "message": "Login successful."
 *                  }
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Email is required"
 *                       param:
 *                         type: string
 *                         example: "email"
 *                 message:
 *                   type: string
 *                   example: "There are some validation errors."
 *       401:
 *         description: Login failed. Invalid credentials.
 *       500:
 *         description: An error occurred during login.
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Registers a new user in the system and returns a JWT token. Validations - name must be a text and have between 1 and 255 characters | email must be in a valid email format | password must have between 6 and 255 characters.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                   {
 *                      "user": {
 *                          "id": 1,
 *                          "name": "John Doe",
 *                          "email": "john.doe@example.com",
 *                          "user_password": "$2a$10$hashValueHere",
 *                          "tasks": []
 *                      },
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *                      "message": "Account created successfully."
 *                      }
 *       400:
 *         description: Account already exists or validation error
 *       500:
 *         description: An error occurred during account creation.
 */

export default{};