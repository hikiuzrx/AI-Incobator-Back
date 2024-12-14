# AI-Incubator API

## Overview

AI-Incubator API is the backend for a mobile app called **Startupi**, which serves as an AI incubator built on LangChain expert agents. The API is structured with a **FastAPI** service for the AI-powered incubator, while **Express.js** acts as the middleware between the AI layer and the frontend. It integrates with a **PostgreSQL** database using **Prisma ORM** for seamless data management and storage. The API is written in **TypeScript** and comes with **Swagger** for API documentation.

## Features

- **FastAPI-based AI Engine**: Uses LangChain expert agents for advanced AI functionality.
- **Express.js Middleware**: Acts as a middleman between the FastAPI service and the frontend.
- **PostgreSQL Database**: Manages and stores user, project, and other application data.
- **Prisma ORM**: Handles database operations with a modern, type-safe query builder.
- **Swagger Documentation**: Interactive API documentation to explore and test endpoints.
- **TypeScript**: Ensures strong typing and better maintainability across the entire codebase.

## Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js** (>= 16.0.0)
- **PostgreSQL** (>= 12.x)
- **TypeScript** (>= 4.x)
- **Prisma ORM** 
**Express**

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-incubator-api.git
cd ai-incubator-api

```
## Set up the PostgreSQL Database
Make sure you have PostgreSQL installed and running.
Create a new database for the project:
```bash
psql -U postgres
CREATE DATABASE startupi;
```
### install dependencies 
```bash
npm install 
```
### schema migration to the database:
```bash
npx run prisma migrate 
```
### configure the env variables: 
```.env
DATABASE_URL=postgresql://username:password@localhost:5432/startupi
AI_API_URL=http://localhost:8000  # URL for the FastAPI AI Engine
PORT = 3000
ACCESS_TOKEN_SCECRET = "ur access secret"
REFRESH_TOKEN_SECRET = "ur refersh secret"
```

### run the server 
```bash
npm run serve
```
### Check documentation :
check the api-docs end point to find documentation of the API
