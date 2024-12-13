import { User } from "@prisma/client";
import {  retriveUserByEmail, retriveUserByUsername } from "./user.service";
import { generateAcessToken, generateRefreshToken } from "../utils/genToken";
import bcrypt from "bcrypt";
import {  ConflictException, UnauthorizedException } from "../exceptions";
import { db } from "../utils/db.server";
import { AuthRequest } from "../types";
function isEmail(identifier: string): boolean {
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegex.test(identifier);
}
export async function register(userData :{fullName:string,email:string,password:string,username:string}){
     let user:User |null = await db.user.findFirst({
          where:{
               OR:[
                    {username:userData.username},
                    {fullName:userData.fullName},
                    {email:userData.email}
               ]
          }
     })
     if(user){
          if(user.email === userData.email){
               throw new ConflictException('email','the email already belong to a user')
          }else if(user.username ===userData.username){
               throw new ConflictException('username','the username already belong to a user')
          }else {
            throw new ConflictException('name','the name already belong to a user')
          }
     }
     const salt:string = await bcrypt.genSalt(10)
     userData.password = await bcrypt.hash(userData.password,salt) 
     user = await db.user.create({
          data:{
               username:userData.username,
               fullName:userData.fullName,
               email:userData.email,
               password:userData.password
          }
     })
          const accessToken = generateAcessToken(user.userId)
          const refreshToken = generateRefreshToken(user.userId)
          const authenticatedUser ={
               fullName:user.fullName,
               email:user.email,
               username:user.username,
               userId:user.userId
          }
          return {authenticatedUser,accessToken,refreshToken}
}
export async function login(identifier:string,password:string){
     let user:User
     console.log('here')
     if(isEmail(identifier)){
          user = await retriveUserByEmail(identifier)
     }else{
           user = await retriveUserByUsername(identifier)
     }
     const auth = await bcrypt.compare(password,user.password)
     if(auth){
          const accessToken  =  generateAcessToken(user.userId)
          const refreshToken = generateRefreshToken(user.userId)
          const authenticatedUser ={
               fullName:user.fullName,
               email:user.email,
               username:user.username,
               userId:user.userId
          }
          return {authenticatedUser,accessToken,refreshToken}
     }else{
          throw new UnauthorizedException('wrong password')
     }
}
