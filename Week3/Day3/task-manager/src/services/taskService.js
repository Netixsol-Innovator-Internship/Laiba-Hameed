import api from "./api";

// Fetch all tasks
export const getTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.get("/tasks", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
// Fetch single task by ID
export const getTaskById = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.get(`/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.post("/tasks", taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Update a task by ID
export const updateTask = async (id, taskData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.put(`/tasks/${id}`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Delete a task by ID
export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.delete(`/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Toggle task completion status
export const toggleTaskCompletion = async (id, completed) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.patch(`/tasks/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
