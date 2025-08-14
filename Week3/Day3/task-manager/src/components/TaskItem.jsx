import { useState } from "react"
import TaskModal from "./TaskModal"
import ToggleSwitch from "./ToggleSwitch"
import LoadingSpinner from "./shared/spiner"

const TaskItem = ({ task, updatingTaskId, deletingTaskId, onToggle, onDelete, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {/* Simple Card */}
            <div
                onClick={() => setIsModalOpen(true)}
                className={`p-4 sm:p-5 lg:p-6 border-2 mb-4 sm:mb-5 lg:mb-6 transition-all ease-in-out duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer h-48 rounded-lg`}
                style={{
                    borderColor: "#a8dadc",
                    backgroundColor: task.completed ? "#f1faee" : "#ffffff",
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Title */}
                    <h3
                        className={`text-lg sm:text-xl font-semibold max-w-[200px] truncate ${task.completed ? "line-through opacity-60" : ""}`}
                        style={{
                            color: task.completed ? "#457b9d" : "#1d3557",
                        }}
                    >
                        {task.title}
                    </h3>

                    <div
                        className="flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {updatingTaskId === task._id ? <LoadingSpinner/> : (
                            <ToggleSwitch
                                checked={task.completed}
                                onChange={() => onToggle(task)}
                                disabled={updatingTaskId === task._id}
                                size="md"
                            />
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="py-3 text-sm text-[#457b9d] line-clamp-5">
                    {task.description || "No description added."}
                </p>
            </div>


            {/* Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={task}
                updatingTaskId={updatingTaskId}
                deletingTaskId={deletingTaskId}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </>
    )
}

export default TaskItem
