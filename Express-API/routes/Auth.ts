import express,{ Router } from "express";
import { Register,Login } from "../controllers/authControllers";
import { Logout }from '../controllers/authControllers'
import { authMiddleware } from "../middlewares/authValidator";
const authRouter:Router = express.Router()
/**
 * @swagger
 * /items:
 *   post:
 *     summary: User registration
 *     description: User registration generating access and refresh tokens 
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
 *               fullName:
 *                 type: string
 *                 description: Full name of the user.
 *               username:
 *                  type:string
 *                  description: user's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account.

 *     responses:
 *       201:
 *         description: user created and authenticated.
 *       400:
 *         description: validation error data missing in request body
 *       409:
 *         description: one of the user's Integrity constrains isn't respected
 *        
 *       500:
 *         description: server related errors meaning error loading env variables or in generating tokens or other 
 */
authRouter.post('/register',Register)
/**
 * @swagger
 * /items:
 *   post:
 *     summary: User login.
 *     description: logging user in 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: user identifier either email or username
 *               password :
 *                 type: string
 *                 description: user password.
 *     responses:
 *       201:
 *         description: successful login .
 *       400:
 *         description: validation error data missing in request body
 *       404:
 *          description : error finding user with identifier provided
 *        401:
 *          description :error in authentication  wrong password     
 *       500:
 *         description: server related errors meaning error loading env variables or in generating tokens or other 
 */
authRouter.post('/login',Login)
/**
 * @swagger
 * /items:
 *   post:
 *     summary: User login.
 *     description: logging user in 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: user identifier either email or username
 *               password :
 *                 type: string
 *                 description: user password.
 *     responses:
 *       201:
 *         description: successful login .
 *       400:
 *         description: validation error data missing in request body
 *       404:
 *          description : error finding user with identifier provided
 *        401:
 *          description :error in authentication  wrong password     
 *       500:
 *         description: server related errors meaning error loading env variables or in generating tokens or other 
 */
authRouter.post('/logout',authMiddleware,Logout)
export default authRouter