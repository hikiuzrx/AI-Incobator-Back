import { Request,Response } from "express";
import Joi from "joi";
import { login, register } from "../service/auth.service";
import errorHandler from "../utils/errorHandler";
import { NextFunction } from "express";
import { AuthRequest } from "../types";

const schema1 = Joi.object({
     fullName: Joi.string().required(),
     email: Joi.string().email().required(),
     username: Joi.string().required(),
     password: Joi.string().min(6).required(),
   });

export async function Register(req:Request,res:Response,next:NextFunction){
     const {error} = schema1.validate(req.body)
     if(error){
          res.status(400).json({messge:error.details[0].message})
     }
     const userData:{username:string,fullName:string,email:string,password:string} = req.body
    try {
      const authenticationData = await register(userData)  
        res.cookie('refreshToken', authenticationData.refreshToken, {
          httpOnly: true, // Prevent client-side JavaScript access
          secure: true, // Use HTTPS (set to `false` for local dev)
          sameSite: 'strict', // Prevent CSRF attacks
          maxAge: 7 * 24 * 60 * 60 * 1000, 
          
        });
        res.status(201).json({...authenticationData.authenticatedUser,accessToken:authenticationData.accessToken})
    } catch (error:any) {
      errorHandler(error,res,next)
    }
}
export async function Login(req:Request,res:Response,next:NextFunction){
    try {
      
      const {password,identifier}:{password:string,identifier:string} =req.body
      console.log('here 2')
      console.log(req.body)
      console.log(password)
      console.log(identifier)
      if(!password || !identifier){
        res.status(401).json({message:'credentials required'})
      }
      const authenticationData = await login(identifier,password)  
         res.cookie('refreshToken', authenticationData.refreshToken, {
           httpOnly: true, // Prevent client-side JavaScript access
           secure: true, // Use HTTPS (set to `false` for local dev)
           sameSite: 'strict', // Prevent CSRF attacks
           maxAge: 7 * 24 * 60 * 60 * 1000, 
         });
         res.status(201).json({...authenticationData.authenticatedUser,accessToken:authenticationData.accessToken})
    } catch (error:any) {
      errorHandler(error,res,next)
    }
}
export async function Logout(req:AuthRequest,res:Response){

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  
}