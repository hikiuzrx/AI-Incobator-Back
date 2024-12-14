import express,{Router}from 'express'
import { DeleteUser, getUser, UpdateUser } from '../controllers/userControllers'
const userRouter:Router = express.Router()
userRouter.get('/:id',getUser)
userRouter.put('/:id',UpdateUser)
userRouter.delete('/:id',DeleteUser)
export default userRouter