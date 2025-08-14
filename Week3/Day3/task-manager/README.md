# Task Manager Web App

A **Task Manager** web application built using **React** with backend integration, allowing users to manage their tasks securely. The app supports authentication, task CRUD operations, and responsive UI design with Tailwind CSS.

## Features

### 📝 Login Page
- Input fields: Email & Password
- Calls `/api/users/login` endpoint
- Saves JWT token in `localStorage` for authentication

### ✅ Task Dashboard (After Login)
- Fetch tasks from `/api/tasks`
- Display list of tasks with title and description
- Create new tasks (POST request)
- Edit existing tasks (PUT request)
- Delete tasks (DELETE request)

### 🔒 Protected Routes
- Redirects users to the login page if they are not authenticated
- Ensures only authorized users can access the dashboard

### 🚀 Bonus
- Logout functionality
- Conditional navigation bar based on authentication status

## Extra Features Implemented
- Loading spinners for async operations (task fetch, update, delete)
- Form validation errors handled and displayed using **React Hook Form**
- "Mark as completed" toggle for tasks with visual indicators
- Styled with **Tailwind CSS** for responsive and modern UI
- Modal for task creation and editing
- Disabled edit button for completed tasks
- Scrollable description area for long task descriptions
- Global loader animation when loading tasks or profile
- Smooth transitions for buttons, cards, and modal actions


## Run Locally
1. Clone repo
2. npm install
3. Create a .env file in the root and add your environment variables
    VITE_API_URL=https://your-backend-url.com
4. npm run dev

## 🔗 Link  
[Live Demo](https://laiba-hameed-week3-day3.vercel.app/)

## 👩‍💻 Author  

**Laiba Hameed**  
GitHub: [Laiba-Hameed](https://github.com/Netixsol-Innovator-Internship/Laiba-Hameed/tree/main)


