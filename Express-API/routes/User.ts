import express,{Router}from 'express'
import { DeleteUser, getUser, UpdateUser } from '../controllers/userControllers'
const userRouter:Router = express.Router()
/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     get:
 *       summary: Get user details
 *       description: Retrieve user information by their unique ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The unique identifier of the user.
 *           schema:
 *             type: string
 *           example: "12345"
 *       responses:
 *         '200':
 *           description: User details retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *         '404':
 *           description: User not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "User not found."
 *         '500':
 *           description: Server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Internal server error."
 */

userRouter.get('/:id',getUser)
/**
 * @swagger
 * put:
 *     summary: Update user details
 *     description: Update the details of an existing user by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *       '400':
 *         description: Bad request - invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user data."
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found."
 *       '500':
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
userRouter.put('/:id',UpdateUser)
/**
 * @swagger
 *  delete:
 *     summary: Delete a user
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found."
 *       '500':
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
userRouter.delete('/:id',DeleteUser)
export default userRouter