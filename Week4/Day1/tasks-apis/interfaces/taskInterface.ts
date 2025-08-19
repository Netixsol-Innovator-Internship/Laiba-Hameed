export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

// Types for request bodies
export interface CreateTaskBody {
    title: string;
    description?: string;
}

export interface UpdateTaskBody {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface UpdateStatusBody {
    completed: boolean;
}