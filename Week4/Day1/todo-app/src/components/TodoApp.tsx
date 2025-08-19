"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"
import type { Task, TaskStats } from "@/types/todo"

const TODOS_STORAGE_KEY = "todo-app-tasks"

export function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        if (typeof window !== "undefined") {
            const savedTasks = localStorage.getItem(TODOS_STORAGE_KEY)
            if (savedTasks) {
                try {
                    const parsedTasks = JSON.parse(savedTasks)
                    return parsedTasks.map((task: Task) => ({
                        ...task,
                        createdAt: new Date(task.createdAt),
                    }))
                } catch (error) {
                    console.error("Failed to parse saved tasks:", error)
                    return []
                }
            }
        }
        return []
    })
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(tasks))
        }
    }, [tasks])

    const addTask = () => {
        if (!newTaskTitle.trim()) {
            setError("Task title is required")
            return
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: newTaskTitle.trim(),
            completed: false,
            createdAt: new Date(),
        }

        setTasks([...tasks, newTask])
        setNewTaskTitle("")
        setError("")
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const getTaskStats = (): TaskStats => {
        const total = tasks.length
        const completed = tasks.filter((task) => task.completed).length
        const pending = total - completed

        return { total, completed, pending }
    }

    const stats = getTaskStats()

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Todo App</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Add Task Section */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                placeholder="Enter a new task..."
                                value={newTaskTitle}
                                onChange={(e) => {
                                    setNewTaskTitle(e.target.value)
                                    if (error) setError("")
                                }}
                                onKeyPress={handleKeyPress}
                                className={`py-6 ${error ? "border-destructive" : ""}`}
                            />
                            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
                        </div>
                        <Button onClick={addTask} className="px-6 py-6 cursor-pointer">
                            <Plus className="h-6 w-6" />
                            Add
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-2">
                        {tasks.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>No tasks yet. Add one above to get started!</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${task.completed ? "bg-muted/50" : "bg-card"
                                        }`}
                                >
                                    <Checkbox className="cursor-pointer" checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                                    <span
                                        className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                                    >
                                        {task.title}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteTask(task.id)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                    >
                                        <Trash2 className="h-6 w-6 " />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
