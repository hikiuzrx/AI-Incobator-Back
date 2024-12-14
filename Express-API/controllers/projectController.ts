import { Request,Response } from "express";
import { NextFunction } from "express";
import * as projectService from "../service/project.service"
import { errorHandler } from "../utils/errorHandler"
import { AuthRequest } from "../types";
import { ValidationException } from "../exceptions";
import { Project } from "@prisma/client";
type updateData =[string,string]

export const selectProject = async (req:AuthRequest, res: Response, next: NextFunction) => {
    
    // Here We do input Validation
    const {id} = req.params
    if(!id){
     throw new ValidationException("id param required")
    }
    try {
        const project:Project= await projectService.selectOneProject(Number(id))
        res.status(200).json({project,accessToken:req.accessToken})
    } catch (error: any) {
        errorHandler(error, res,next)
    }

}
export async function deleteProject(req:AuthRequest,res:Response,next:NextFunction){
     const id = req.params.id
     if(!id){
          throw new ValidationException('user id required')
     }
     try {
           await projectService.deleteProject(parseInt(id))
          res.status(204).json({message:'project deleted successfully'})
     } catch (error:any) {
          errorHandler(error,res,next)
     }
}
export async function createProject(req:AuthRequest,res:Response,next:NextFunction){
     const projectData :{title:string,description:string,budjetRequired:number}= req.body
     if(!projectData.title|| !projectData.description || !projectData.budjetRequired){
          res.status(400).json({message:'unvalid request project data required'})
     }
     try {
          const userId = req.userId
          if(userId){
               const project = await projectService.createProject({title:projectData.title,description:projectData.description,budjet:projectData.budjetRequired,ownerID:userId})
               res.status(201).json({project,accessToken:req.accessToken})
          }
        
     } catch ( error:any) {
          errorHandler(error,res,next)
     }
}
export const ProjectsOfUser = async (req:AuthRequest, res: Response, next: NextFunction) => {
     const id = req.userId
     if(!id){
          throw new ValidationException('user id required')
     }
    try {
     const projects:Project[]= await projectService.listProjectsByUser(id)
     res.status(200).json({projects,accessToken:req.accessToken})   
    } catch (error: any) {
        errorHandler(error, res,next)
    }
}
export async function updateProject(req:AuthRequest,res:Response,next:NextFunction){
     const projectid = req.params.projectId
     const updateData:updateData = req.body
     if(!projectid ||!updateData[0] || !updateData[1] ){
          throw new ValidationException('update data missing')
     }
     try {

          const updatedProject = await projectService.updateProject(parseInt(projectid),updateData)
          res.status(203).json({project:updatedProject,accessToken:req.accessToken})
     } catch (error : any) {
          errorHandler(error,res,next)
     }
}











 
export async function GetDashBoard(req:Request,res:Response,next:NextFunction) {
    const dashboard = req.body;


    
    
}