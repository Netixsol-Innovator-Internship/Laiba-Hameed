"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { taskSchema } from "../schemas/taskSchema"
import LoadingSpinner from "./shared/spiner"

const CreateTask = ({ onClose, onSave, adding }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            completed: false,
        },
    })

    const submitForm = (data) => {
        onSave(data)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-8">
            <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(29, 53, 87, 0.8)" }}
            >
                <div
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl p-6 sm:p-8 lg:p-10 mx-4 bg-[#f1faee] shadow-2xl rounded-2xl transform transition-all duration-300 ease-in-out"
                >
                    <h2 className="text-xl font-bold mb-6" style={{ color: "#1d3557" }}>
                        Add New Task
                    </h2>

                    {/* Title */}
                    <div className="mb-4 sm:mb-5 lg:mb-6">
                        <input
                            type="text"
                            placeholder="Task Title"
                            {...register("title")}
                            className="w-full border-2 p-3 text-base rounded-lg  focus:outline-none transition-all duration-300 focus:shadow-lg"
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

                    {/* Description */}
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 sm:gap-4 lg:gap-5">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg flex items-center justify-center font-medium text-base border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
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
                            className="px-6 py-2 rounded-lg flex items-center justify-center font-medium text-base text-[#f1faee] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-[#1d3557]"
                            onMouseEnter={(e) => !adding && (e.target.style.backgroundColor = "#457b9d")}
                            onMouseLeave={(e) => !adding && (e.target.style.backgroundColor = "#1d3557")}
                            disabled={adding}
                        >
                            {adding ? <LoadingSpinner /> : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTask
