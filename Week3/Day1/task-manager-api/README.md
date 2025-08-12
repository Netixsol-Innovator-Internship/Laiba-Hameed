# Task Manager API

## Overview
Simple RESTful API built with Node.js & Express for managing tasks in-memory.

## Run Locally
1. Clone repo
2. `npm install`
3. `node swagger.js`
4. `node server.js`

## Endpoints
- GET /api/tasks   - get all tasks 
- GET /api/tasks/:id - get one specific task
- POST /api/tasks - create new task 
- PUT /api/tasks/:id - updated any task
- DELETE /api/tasks/:id - delete any task

## Response Structure
{
  "success": true,
  "data": {...},
  "message": "..."
}

## Swagger Docs
Visit http://localhost:3000/api-docs

## 🔗 Link  
[Live Demo](https://laiba-hameed-week3-day1-backend.vercel.app/api-docs/)

## 👩‍💻 Author  

**Laiba Hameed**  
GitHub: [Laiba-Hameed](https://github.com/Netixsol-Innovator-Internship/Laiba-Hameed/tree/main)
