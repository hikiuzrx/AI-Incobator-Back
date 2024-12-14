import { Project, Task } from "@prisma/client";
import {NotFoundException, ConflictException} from "../exceptions";
import { db } from "../utils/db.server";
import { updateUser } from './user.service';

type updateData =[string,string]
export const selectOneProject = async (projectIdToFind: number): Promise<Project> => {

        const project = await db.project.findUnique({
            where: {
                projectId: projectIdToFind
            }
        })
        if (!project){
            throw new NotFoundException('project', 'No Project Found');
        }
        return project
}

export const listProjectsByUser = async (userId: number): Promise<Project[]> => {

    const projects = await db.project.findMany({
        where: {
            ownerId: userId
        }
    })
    if (!projects) {
        throw new NotFoundException('project', 'No Project Yet');
    }
    return projects    
}


export const deleteProject = async (deleteProjectId: number) => {
    const deleteProject = await db.project.delete({
        where: {
            projectId: deleteProjectId
        }
    })
    if(!deleteProject){
     throw new NotFoundException('no project with this userid')
    }
}

export const createProject = async (
projectData:{    
     title: string,
     description: string,
     budjet: number,
     ownerID: number}
): Promise<Project> => {

    const newProject = await db.project.create({
        data: {
            projectTitle: projectData.title,
            Description: projectData.description,
            budjetRequired: projectData.budjet,
            ownerId: projectData.ownerID
        }
    })
    return newProject
}

export const updateProject = async (
    projectID: number,
    update: updateData
)=> {
    switch (update[0]) {
        case 'projectTitle':
            const projectToUpdateTitle: Project = await db.project.update({
                where: {
                    projectId: projectID,
                },
                data: {
                    projectTitle: update[1],
                },
            })
            return projectToUpdateTitle
            break;
        case 'Description':
            const projectToUpdateDescription: Project = await db.project.update({
                where: {
                    projectId: projectID,
                },
                data: {
                    Description: update[1],
                },
            })
            return projectToUpdateDescription
            break;
        case 'budjetRequired':
            const projectToUpdateBudjet: Project = await db.project.update({
                where: {
                    projectId: projectID,
                },
                data: {
                    budjetRequired: Number(update[1]),
                },
            })
            return projectToUpdateBudjet
            break;
            
    }
}