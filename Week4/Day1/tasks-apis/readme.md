# 📋 Task Manager API (Express + TypeScript)

A simple REST API built with **Express**, **TypeScript**, and **Swagger** for managing tasks.  
It supports creating, reading, updating, and deleting tasks, as well as partial updates (PATCH).

---

## 🚀 Features

- CRUD operations for tasks
- Partial updates using **PATCH**
- Request validation with middlewares
- Global error handling
- Interactive API documentation with **Swagger UI**

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Swagger (OpenAPI 3.0)** for documentation
- **CORS** enabled
- Development with `ts-node-dev`

---


---

## ⚡ Getting Started

# 1. Clone the repo
# 2. cd task-manager-api
# 3. npm install
# 4. npx ts-node-dev server.ts

## Endpoints
Base URL: http://localhost:5000/api/tasks
- GET /api/tasks   - get all tasks 
- GET /api/tasks/:id - get one specific task
- POST /api/tasks - create new task 
- PATCH /api/tasks/:id - updated any task
- PATCH /api/tasks/:id/status - updated any task status
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
[Live Demo](https://laiba-hameed-week4-day1-backend.vercel.app/api-docs/)

## 👩‍💻 Author  

**Laiba Hameed**  
GitHub: [Laiba-Hameed](https://github.com/Netixsol-Innovator-Internship/Laiba-Hameed/tree/main)