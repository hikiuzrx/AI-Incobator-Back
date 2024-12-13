import { ConflictException, NotFoundException } from "../types";
import { db } from "../utils/db.server";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'
type updateData = [string,string]
export async function createUser(userData:{fullName:string,email:string,password:string,username:string}):Promise<User>{
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
     return user
}
export async function retriveUserById(userId : number ):Promise<User>{
     const user:User|null = await db.user.findUnique({
        where:{
             userId
        }
     })
     if(!user){
          throw new NotFoundException('user','there is no user with this user id')
     }
     return user
   }
export async function retriveUserByEmail(email : string ):Promise<User>{
     const user:User|null =await db.user.findUnique({
        where:{
             email
        }
     })
     if(!user){
          throw new NotFoundException('user','there is no user with this email')
     }
     return user
   }
export async function  retriveUserByUsername(username : string ):Promise<User>{
     const user:User|null = await db.user.findFirst({
        where:{
             username
        }
     })
     if(!user){
          throw new NotFoundException('user','there is no user with this username')
     }
     return user
   }
export async function UpdateUser(id:number, updateData :updateData ) {
     switch (updateData[0]){
     case 'fullName':
     var user:User|null = await db.user.findUnique({
          where:{
               fullName:updateData[1]
          }
     })
     if(user){
          throw new ConflictException('user','this name is already in use')
     }else{
          return await db.user.update({
               where: {
                    userId: id
               },
               data: {
                  fullName :updateData[1]
               }
          })
     }  
          
     case 'email':
          var user :User|null = await  db.user.findFirst({
               where:{
                    email:updateData[1]
               }
          })
          if(user){
               throw new ConflictException('email already in use')
          }else{
               return  db.user.update({
                    where: {
                         userId: id
                    },
                    data: {
                       email :updateData[1]
                    }
               })
          }
     case 'password' :
          const salt : string = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(updateData[1],salt)
          return db.user.update({
               where :{
                    userId:id
               },
               data: {
                    password:hashedPassword
               }
          })
          
          case 'username' : 
          var user :User|null = await db.user.findUnique({
               where: {
                    username : updateData[1]
               }
          })
          if(user){
               throw new ConflictException('username already in use')
          }else{
               return db.user.update({
                    where:{
                         userId:id
                    },
                    data:{
                         username:updateData[1]
                    }
               })
          }
   }
}
export async function  deleteUser(id:number ):Promise<User>{
     return await db.user.delete({
          where:{
               userId:id
          }
     })
}