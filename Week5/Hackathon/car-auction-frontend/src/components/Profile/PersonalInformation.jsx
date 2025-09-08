import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Edit, Save, X } from "lucide-react"
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/slices/users/usersApi"
import { personalInfoSchema } from "@/lib/validations/personalInfoSchema"

export default function PersonalInformation() {
    const [isEditing, setIsEditing] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    // ✅ Get logged-in userId from Redux
    const userId = useSelector((state) => state.auth?.user?._id)

    // ✅ Fetch user details
    const { data: user, isLoading } = useGetUserQuery(userId, { skip: !userId })

    // ✅ Hook for update mutation
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
    } = useForm({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobileNumber: "",
            nationality: "",
            idType: "",
            idNumber: "",
        },
    })

    // Reset form when user data loads
    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName || "",
                email: user.email || "",
                mobileNumber: user.mobileNo || "",
                nationality: user.nationality || "",
                idType: user.idType || "",
                idNumber: user.idNo || "",
            })
        }
    }, [user, reset])

    const onSubmit = async (data) => {
        try {
            await updateUser({ id: userId, data }).unwrap()
            setIsEditing(false)
        } catch (err) {
            console.error(" Failed to update:", err)
        }
    }

    const handleCancel = () => {
        reset(user)
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card>
                <CardHeader className="bg-indigo-700 text-white">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">
                            Personal Information
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-white hover:bg-indigo-600"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex items-start space-x-6 mb-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                </div>

                                {/* Fields */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <Input {...register("fullName")} />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("fullName")}</p>
                                        )}
                                        {errors.fullName && (
                                            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        {isEditing ? (
                                            <Input type="email" {...register("email")} />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("email")}</p>
                                        )}
                                        {errors.email && (
                                            <p className="text-red-500 text-xs">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Mobile Number
                                        </label>
                                        {isEditing ? (
                                            <Input {...register("mobileNumber")} />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("mobileNumber")}</p>
                                        )}
                                        {errors.mobileNumber && (
                                            <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>
                                        )}
                                    </div>

                                    {/* Nationality */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Nationality
                                        </label>
                                        {isEditing ? (
                                            <Controller
                                                name="nationality"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Nationality" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pakistan">Pakistan</SelectItem>
                                                            <SelectItem value="India">India</SelectItem>
                                                            <SelectItem value="USA">USA</SelectItem>
                                                            <SelectItem value="UK">UK</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("nationality")}</p>
                                        )}
                                        {errors.nationality && (
                                            <p className="text-red-500 text-xs">{errors.nationality.message}</p>
                                        )}
                                    </div>

                                    {/* ID Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            ID Type
                                        </label>
                                        {isEditing ? (
                                            <Controller
                                                name="idType"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select ID Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cnic">CNIC</SelectItem>
                                                            <SelectItem value="passport">Passport</SelectItem>
                                                            <SelectItem value="driver_license">Driver License</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("idType")}</p>
                                        )}
                                        {errors.idType && (
                                            <p className="text-red-500 text-xs">{errors.idType.message}</p>
                                        )}
                                    </div>


                                    {/* ID Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            ID Number
                                        </label>
                                        {isEditing ? (
                                            <Input {...register("idNumber")} />
                                        ) : (
                                            <p className="text-gray-600 py-2">{watch("idNumber")}</p>
                                        )}
                                        {errors.idNumber && (
                                            <p className="text-red-500 text-xs">{errors.idNumber.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            {isEditing && (
                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="flex items-center space-x-2"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                                    </Button>
                                </div>
                            )}
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
