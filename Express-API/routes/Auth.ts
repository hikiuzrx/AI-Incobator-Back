import express,{ Router } from "express";
import { Register,Login } from "../controllers/authControllers";
import { Logout }from '../controllers/authControllers'
import { authMiddleware } from "../middlewares/authValidator";
const authRouter:Router = express.Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: User registration generating access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - fullName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier for the user.
 *                 example: "12345"
 *               fullName:
 *                 type: string
 *                 description: Full name of the user.
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 description: User's username.
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account.
 *                 example: "password123"
 *     responses:
 *       '201':
 *         description: User created and authenticated.
 *       '400':
 *         description: Validation error - missing data in the request body.
 *       '409':
 *         description: Integrity constraint error - duplicate email or username.
 *       '500':
 *         description: Server-related error, such as token generation failure or configuration issues.
 */
authRouter.post('/register',Register)
/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: User login
 *       description: Logging the user in by providing identifier and password.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - identifier
 *                 - password
 *               properties:
 *                 identifier:
 *                   type: string
 *                   description: User identifier, either email or username.
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   description: User password.
 *                   example: "SecureP@ssw0rd"
 *       responses:
 *         '200':
 *           description: Successful login.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Confirmation message.
 *                     example: "Login successful."
 *                   token:
 *                     type: string
 *                     description: JWT token for user authentication.
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         '400':
 *           description: Validation error - data missing in the request body.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Details about the validation error.
 *                     example: "Identifier and password are required."
 *         '404':
 *           description: User not found with the provided identifier.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Details about the error.
 *                     example: "No user found with the provided identifier."
 *         '401':
 *           description: Authentication error - incorrect password.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Details about the authentication error.
 *                     example: "Incorrect password."
 *         '500':
 *           description: Server-related errors such as issues loading environment variables or generating tokens.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Details about the server error.
 *                     example: "Internal server error."
 */
authRouter.post('/login',Login)
/**
 * @swagger
 * paths:
 *   /auth/logout:
 *     post:
 *       summary: User logout
 *       description: Logs the user out by invalidating their authentication token.
 *       tags:
 *         - Authentication
 *       security:
 *         - bearerAuth: [] # Assuming you're using Bearer Token authentication
 *       responses:
 *         '200':
 *           description: Successful logout.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Confirmation message.
 *                     example: "Logout successful."
 *         '401':
 *           description: Unauthorized - user is not logged in or token is invalid.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error details.
 *                     example: "Invalid or missing authentication token."
 *         '500':
 *           description: Server error - an issue occurred during the logout process.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Details of the server error.
 *                     example: "Internal server error."
 */
authRouter.post('/logout',authMiddleware,Logout)
export default authRouter