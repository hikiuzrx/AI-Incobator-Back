import express,{ Router } from "express";
const authRouter:Router = express.Router()
authRouter.post('/register')
authRouter.post('/login')