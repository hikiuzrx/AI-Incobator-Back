import { User } from "@prisma/client";
import { createUser, retriveUserByEmail } from "./user.service";
import { generateAcessToken, generateRefreshToken } from "../utils/genToken";
import { compare } from "bcrypt";
import { NotFoundException, UnauthorizedException } from "../types";
function isEmail(identifier: string): boolean {
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegex.test(identifier);
}
export async function register(userData :{fullName:string,email:string,password:string,username:string}){
          const user:User = await createUser(userData)
          const accessToken = generateAcessToken(user.userId)
          const refreshToken = generateRefreshToken(user.userId)
          return {user,accessToken,refreshToken}
}
export async function login(identifier:string,password:string){
     if(isEmail(identifier)){
          const user:User = await retriveUserByEmail(identifier)
          const auth = await compare(password,user.password)
          if(auth){
               const accessToken  =  generateAcessToken(user.userId)
               const refreshToken = generateRefreshToken(user.userId)
               return {user,accessToken,refreshToken}
          }else{
               throw new UnauthorizedException('wrong password')
          }
     }else{
          
     }
}