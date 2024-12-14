import { ConflictException, NotFoundException } from "../exceptions";
import { db } from "../utils/db.server";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'
type updateData = [string,string]
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
export async function updateUser(id:number, updateData :updateData ) {
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