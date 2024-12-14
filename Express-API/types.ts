import { Request } from "express"
type AuthenticatedUser = {
     userId: number
     fullName : string,
     usernme:string,
     email:string,
     accessToken :string
   }
export interface AuthRequest extends Request {
     userId?:number,
     accessToken?:string
}
export  interface DecodedToken {
     userId: string |number
     // Add any other claims you have in your token
   }