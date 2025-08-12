# Task Manager API

## Overview
A simple RESTful API built with **Node.js** & **Express** for managing tasks with authentication and user accounts.

## Features
- User authentication (JWT-based)
- Create, read, update, and delete tasks
- Delete user account
- Swagger UI documentation

## Run Locally
1. Clone repo
2. npm install
3. node swagger.js
4. node server.js

## Endpoints
# Auth
- POST /api/auth/signup – Register a new user
- POST /api/auth/login – Login and get a token
- GET /api/auth/profile –  user profile
- DELETE /api/auth/profile – Delete your account (and all related tasks) 

# Tasks
- GET /api/tasks – Get all tasks for logged-in user
- GET /api/tasks/:id – Get a specific task
- POST /api/tasks – Create a new task
- PUT /api/tasks/:id – Update a task
- DELETE /api/tasks/:id – Delete a task

# For testing on Swagger UI, add authentication as:
 Bearer <your_token_string>

## Response Structure
{
  "success": true,
  "data": {...},
  "message": "..."
}

## Swagger Docs
Visit http://localhost:3000/api-docs

## 🔗 Link  
[Live Demo](https://laiba-hameed-week3-day2-backend.vercel.app/api-docs/)

## 👩‍💻 Author  

**Laiba Hameed**  
GitHub: [Laiba-Hameed](https://github.com/Netixsol-Innovator-Internship/Laiba-Hameed/tree/main)
