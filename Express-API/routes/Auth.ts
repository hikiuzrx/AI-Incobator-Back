import express,{ Router } from "express";
import { Register,Login } from "../controllers/authControllers";
import { Logout }from '../controllers/authControllers'
import { authMiddleware } from "../middlewares/authValidator";
const authRouter:Router = express.Router()
authRouter.post('/register',Register)
authRouter.post('/login',Login)
authRouter.post('/logout',authMiddleware,Logout)
export default authRouter