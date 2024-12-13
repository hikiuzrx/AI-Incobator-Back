import { Request,Response } from "express";
import Joi from "joi";
import { register } from "../service/auth.service";

const schema = Joi.object({
     fullName: Joi.string().required(),
     email: Joi.string().email().required(),
     username: Joi.string().required(),
     password: Joi.string().min(6).required(),
   });
export async function Register(req:Request,res:Response){
     const {error} = schema.validate(req.body)
     if(error){
          res.status(400).json({messge:error.details[0].message})
     }
     const userData = req.body
     
        const authenticationData = await register(userData)  
        res.cookie('refreshToken', authenticationData.refreshToken, {
          httpOnly: true, // Prevent client-side JavaScript access
          secure: true, // Use HTTPS (set to `false` for local dev)
          sameSite: 'strict', // Prevent CSRF attacks
          maxAge: 7 * 24 * 60 * 60 * 1000, 
          
        });
        res.status(201).json({...authenticationData.user,accessToken:authenticationData.accessToken})
     


}