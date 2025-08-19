export interface Task {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

export interface TaskStats {
    total: number
    completed: number
    pending: number
}
