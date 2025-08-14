import * as yup from "yup";

export const taskSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(50,"Title must be below 50 characters"),
    description: yup.string().required("Description is required").min(5, "Description must be at least 5 characters").max(1000,"Title must be below 1000 characters"),
    completed: yup.boolean()
});