import LoadingSpinner from "./shared/spiner"
import ToggleSwitch from "./ToggleSwitch"

const TaskView = ({ task, updatingTaskId, deletingTaskId, onToggle, onDelete, onEdit }) => {
    return (
        <>
            {/* Title + Toggle */}
            <div className="flex items-center justify-between py-4 mt-4 gap-4 sm:gap-6 lg:gap-8">
                <h2
                    className={`text-xl font-semibold pr-4 sm:pr-6 lg:pr-8 transition-all duration-300 ${task.completed ? "line-through opacity-60" : ""
                        }`}
                    style={{ color: task.completed ? "#457b9d" : "#1d3557" }}
                >
                    {task.title}
                </h2>

                {updatingTaskId === task._id ? <LoadingSpinner /> : (
                    <ToggleSwitch
                        checked={task.completed}
                        onChange={() => onToggle(task)}
                        disabled={updatingTaskId === task._id}
                        size="md"
                    />
                )}
            </div>

            {/* Description */}
            <div className="mb-6">
                <h3 className="text-lg mb-3" style={{ color: "#457b9d" }}>
                    Description
                </h3>

                <p
                    className={`text-base leading-relaxed transition-all duration-300 max-h-48 overflow-y-auto px-1 ${task.completed ? "line-through opacity-60" : ""}`}
                    style={{ color: task.completed ? "#457b9d" : "#1d3557" }}
                >
                    {task.description || "No description added."}
                </p>
            </div>


            {/* Buttons */}
            <div className="flex justify-end gap-3 sm:gap-4 lg:gap-5">
                <button
                    onClick={onEdit}
                    disabled={task.completed || updatingTaskId === task._id}
                    className={`px-6 py-2 rounded-lg text-base text-[#f1faee] transition-all duration-300 ease-in-out transform hover:shadow-lg ${task.completed ? "bg-gray-400 cursor-not-allowed" : "bg-[#1d3557] cursor-pointer hover:bg-[#457b9d]"}`}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    disabled={deletingTaskId === task._id}
                    className="px-6 py-2 rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg disabled:transform-none"
                    style={{ backgroundColor: "#e63946", color: "#f1faee" }}
                    onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = "#1d3557")}
                    onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = "#e63946")}
                >
                    {deletingTaskId === task._id ? <LoadingSpinner /> : "Delete"}
                </button>
            </div>
        </>
    )
}

export default TaskView
