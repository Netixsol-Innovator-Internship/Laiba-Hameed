/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from "../services/taskService";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import Loader from "./shared/Loader";
import LoadingSpinner from "./shared/spiner";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleCreateTask = async (taskData) => {
        if (!taskData.title.trim()) return;
        setAdding(true);
        try {
            await createTask(taskData);
            setNewTaskTitle("");
            fetchTasks();
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };


    const handleDeleteTask = async (id) => {
        setDeletingTaskId(id);
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingTaskId(null);
        }
    };

    const handleToggleTask = async (task) => {
        setUpdatingTaskId(task._id);
        try {
            await toggleTaskCompletion(task._id, !task.completed);
            fetchTasks();
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const handleUpdateTask = async (task) => {
        setUpdatingTaskId(task._id);
        try {
            await updateTask(task._id, {
                title: task.title,
                description: task.description || "",
                completed: task.completed
            });
            fetchTasks();
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingTaskId(null);
        }
    };


    if (loading) return (
        <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-32">
            <p className="text-lg sm:text-xl lg:text-2xl font-medium animate-pulse" style={{ color: '#457b9d' }}>
                <Loader />
            </p>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
            {/* New Task */}
            <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 items-center justify-between">
                <h1 className="text-2xl font-bold text-[#1d3557]">
                    Wana Add New Task?
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={adding}
                    className={`text-white px-6 py-2 flex items-center justify-center font-medium text-base rounded-lg transition-all ease-in-out duration-300 transform hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-24 sm:min-w-28 lg:min-w-32 bg-[#457b9d] hover:bg-[#1d3557]`}
                >
                    {adding ? <LoadingSpinner /> : "Add"}
                </button>
            </div>

            {/* Task List */}
            {tasks.length === 0 ? (
                <div className="text-center py-8 sm:py-12 lg:py-16">
                    <p className="text-lg sm:text-xl lg:text-2xl font-medium text-[#457b9d]">
                        No tasks yet
                    </p>
                    <p className="text-base sm:text-lg mt-2 sm:mt-3 text-[#a8dadc]">
                        Create your first task above
                    </p>
                </div>
            ) : (
                <>
                    <h1 className="text-xl mb-6 sm:mb-8 lg:mb-10 text-[#a8dadc]">
                        Your All Tasks :
                    </h1>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                        {tasks.map(task => (
                            <li key={task._id}>
                                <TaskItem
                                    task={task}
                                    updatingTaskId={updatingTaskId}
                                    deletingTaskId={deletingTaskId}
                                    onToggle={handleToggleTask}
                                    onDelete={handleDeleteTask}
                                    onUpdate={handleUpdateTask}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Modal */}
            {isModalOpen && (
                <CreateTask
                    onClose={() => setIsModalOpen(false)}
                    onSave={async (taskData) => {
                        setAdding(true);
                        try {
                            await handleCreateTask(taskData);
                            fetchTasks();
                            setIsModalOpen(false);
                        } catch (err) {
                            console.error(err);
                        } finally {
                            setAdding(false);
                        }
                    }}
                    adding={adding}
                />
            )}
        </div>

    );

};

export default TaskManager;
