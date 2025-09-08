import { z } from "zod"

export const personalInfoSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().min(1, "Mobile number is required"),
    nationality: z.string().min(1, "Nationality is required"),
    idType: z.enum(["cnic", "passport", "driver_license"], {
        errorMap: () => ({ message: "Please select a valid ID type" }),
    }),
    idNumber: z.string().min(6, "ID number must be at least 6 characters"),

})
