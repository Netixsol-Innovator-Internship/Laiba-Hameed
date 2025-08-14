import { useState } from "react"
import TaskEdit from "./TaskEdit"
import TaskView from "./TaskView"

const TaskModal = ({ isOpen, onClose, task, updatingTaskId, deletingTaskId, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(29, 53, 87, 0.8)" }}
                onClick={onClose}
            />


            {/* Modal box */}
            <div className="relative w-full max-w-2xl p-6 bg-[#f1faee] rounded-2xl" >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 sm:top-3 sm:right-3 border-none transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{ color: "#1d3557" }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {isEditing ? (
                    <TaskEdit
                        task={task}
                        updatingTaskId={updatingTaskId}
                        onUpdate={(t, title, desc) => { onUpdate(t, title, desc); setIsEditing(false) }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <TaskView
                        task={task}
                        updatingTaskId={updatingTaskId}
                        deletingTaskId={deletingTaskId}
                        onToggle={onToggle}
                        onDelete={async (id) => {
                            try {
                                await onDelete(id); 
                                onClose();   
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        onEdit={() => {
                            if (!task.completed) {
                                setIsEditing(true)
                            } else {
                                setIsEditing(false)
                            }
                        }}
                    />
                )}
            </div>
        </div >
    )
}

export default TaskModal
