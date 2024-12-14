import express,{ Router } from "express";
import { createProject, deleteProject, ProjectsOfUser, selectProject, updateProject } from "../controllers/projectController";
const projectRouter :Router= express.Router()

/**
 * @swagger
 * paths:
 * /projects/dashboard:
 *   get:
 *     summary: Get all projects of a user
 *     description: Retrieve all projects associated with a specific user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "proj123"
 *                   name:
 *                     type: string
 *                     example: "Project Alpha"
 *                   description:
 *                     type: string
 *                     example: "A project to explore new ideas."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-01T10:00:00Z"
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Server error.
 *
 */
projectRouter.get('/dashboard',ProjectsOfUser)
/**
 * @swagger
 *  post:
 *     summary: Create a new project
 *     description: Create a new project for a user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the project.
 *                 example: "Project Alpha"
 *               description:
 *                 type: string
 *                 description: Description of the project.
 *                 example: "A project to explore new ideas."
 *     responses:
 *       '201':
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "proj123"
 *                 message:
 *                   type: string
 *                   example: "Project created successfully."
 *       '400':
 *         description: Invalid input data.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Server error.
 */
projectRouter.post('dashboard',createProject)
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project details
 *     description: Retrieve details of a specific project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the project.
 *         schema:
 *           type: string
 *           example: "proj123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Project details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "proj123"
 *                 name:
 *                   type: string
 *                   example: "Project Alpha"
 *                 description:
 *                   type: string
 *                   example: "A project to explore new ideas."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-01T10:00:00Z"
 *       '404':
 *         description: Project not found.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Server error.
 */
projectRouter.get('/:id',selectProject)
/**
 * @swagger
 *  put:
 *     summary: Update a project
 *     description: Update the details of a specific project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the project.
 *         schema:
 *           type: string
 *           example: "proj123"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the project.
 *                 example: "Updated Project Alpha"
 *               description:
 *                 type: string
 *                 description: Updated description of the project.
 *                 example: "Updated description of the project."
 *     responses:
 *       '200':
 *         description: Project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully."
 *       '400':
 *         description: Invalid input data.
 *       '404':
 *         description: Project not found.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Server error.
 */
projectRouter.put('/:id',updateProject!)
/**
 * @swagger
 * delete:
 *     summary: Delete a project
 *     description: Delete a specific project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the project.
 *         schema:
 *           type: string
 *           example: "proj123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Project deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project deleted successfully."
 *       '404':
 *         description: Project not found.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Server error.
 */
projectRouter.delete('/:id',deleteProject)
export default projectRouter