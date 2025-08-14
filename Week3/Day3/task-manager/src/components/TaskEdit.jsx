import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../schemas/taskSchema";
import LoadingSpinner from "./shared/spiner";

const TaskEdit = ({ task, updatingTaskId, onUpdate, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            title: task.title,
            description: task.description || "",
            completed: task.completed || false,
        },
    });

    const submitForm = (data) => {
        onUpdate({ ...task, ...data }); // <-- call parent onUpdate
    };

    return (
        <div className="py-3 px-2">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1d3557" }}>
                Eidt Task
            </h2>

            <div className="mb-4 sm:mb-5 lg:mb-6">
                <input
                    type="text"
                    placeholder="Task Title"
                    {...register("title")}
                    className="w-full border-2 p-3 text-lg rounded-lg font-semibold focus:outline-none transition-all duration-300 focus:shadow-lg"
                    style={{
                        borderColor: "#a8dadc",
                        backgroundColor: "#f1faee",
                        color: "#1d3557",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#457b9d")}
                    onBlur={(e) => (e.target.style.borderColor = "#a8dadc")}
                />
                {errors.title && (
                    <p className="text-sm mt-2 font-medium" style={{ color: "#e63946" }}>
                        {errors.title.message}
                    </p>
                )}
            </div>


            <div className="mb-4 sm:mb-5 lg:mb-6">
                <textarea
                    placeholder="Task Description"
                    {...register("description")}
                    rows={4}
                    className="w-full border-2 p-3 text-base rounded-lg focus:outline-none transition-all duration-300 focus:shadow-lg resize-none"
                    style={{
                        borderColor: "#a8dadc",
                        backgroundColor: "#f1faee",
                        color: "#1d3557",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#457b9d")}
                    onBlur={(e) => (e.target.style.borderColor = "#a8dadc")}
                />
                {errors.description && (
                    <p className="text-sm mt-2 font-medium" style={{ color: "#e63946" }}>
                        {errors.description.message}
                    </p>
                )}
            </div>


            <div className="flex justify-end gap-3 sm:gap-4 lg:gap-5">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 rounded-lg flex items-center justify-center font-medium text-base border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    style={{
                        borderColor: "#a8dadc",
                        color: "#1d3557",
                        backgroundColor: "#f1faee",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = "#457b9d"
                        e.target.style.color = "#457b9d"
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = "#a8dadc"
                        e.target.style.color = "#1d3557"
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit(submitForm)}
                    disabled={updatingTaskId === task._id}
                    className="px-6 py-2 rounded-lg flex items-center justify-center font-medium text-base text-[#f1faee] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-[#1d3557]"
                >
                    {updatingTaskId === task._id ? <LoadingSpinner /> : "Save"}
                </button>
            </div>
        </div>
    );
};

export default TaskEdit;

