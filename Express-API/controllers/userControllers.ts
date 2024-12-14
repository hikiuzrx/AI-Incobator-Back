import { NextFunction, Request,Response } from "express";
import { deleteUser, retriveUserById, updateUser } from "../service/user.service";
import { User } from "@prisma/client";
import { ValidationException } from "../exceptions";
import { AuthRequest } from "../types";
import errorHandler from "../utils/errorHandler";
export async function UpdateUser(req:AuthRequest,res:Response,next:NextFunction) {
     let id =req.params.id
     if(!id){
          res.status(400).json({message:'route params required'})
     }
     try {
          var user:User = await retriveUserById(parseInt(id))
          const updateData :[string,string] = req.body
          if(!updateData){
               throw new ValidationException('update data missing')
          }
          const updatedUser =  await  updateUser(user.userId,updateData)
          if(updatedUser){
             res.status(203).json({userId:updatedUser.userId,email:updatedUser.email,fullName:updatedUser.fullName,username:updatedUser.username,accessToken:req.accessToken})  
          }
     } catch (error:any) {
          errorHandler(error,res,next)
     }
}
export async function getUser(req:AuthRequest,res:Response,next:NextFunction){
     const id = req.params.id
     if(!id){
          res.status(400).json({message:'route params required'})
     }
     try {
          const user:User = await  retriveUserById(parseInt(id))
          res.status(200).json({userId:user.userId,email:user.email,fullName:user.fullName,username:user.username,accessToken:req.accessToken})
     } catch (error:any) {
          errorHandler(error,res,next)
     }
}
export async function DeleteUser(req:AuthRequest,res:Response,next:NextFunction){
     const id = req.params.id
     if(!id){
          res.status(400).json({message:'route params required'})
     }
     try {
          const deletedUser:User = await deleteUser(parseInt(id))
          if(!deletedUser){
               res.status(400).json({message:"user doesn't exist"})
          }else{
               res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: true, // Set to true if using HTTPS
                    sameSite: 'strict',})
               res.status(201).json({message:'user account deleted'})
          }
     } catch (error:any) {
          errorHandler(error,res,next)
     }
}