"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validations/registerSchema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useSignupMutation } from "@/redux/slices/auth/authApi"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
    const [signup, { isLoading }] = useSignupMutation()
    const [serverError, setServerError] = useState(null)

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobileNo: "",
            username: "",
            password: "",
            idNo: "",
            idType: "",
            confirmPassword: "",
            captcha: false,
            terms: false,
        },
    })
    const router = useRouter()

    const onSubmit = async (values) => {
        setServerError(null)
        try {
            const { confirmPassword, country, mobileNo, captcha, terms, ...rest } = values

            const payload = {
                ...rest,
                mobileNo: `+${country}${mobileNo}`,  
            }

            await signup(payload).unwrap()
            router.push("/login")
        } catch (err) {
            setServerError(err?.data?.message || "Something went wrong")
        }
    }



    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-4 py-20">
            <div className="flex justify-center mb-8">
                <div className="flex bg-white rounded-full p-1 shadow-sm border">
                    <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium">
                        Register
                    </button>
                    <Link href="/login">
                        <button className="px-6 py-2 rounded-full text-gray-600 font-medium hover:text-gray-900">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                        Register
                    </CardTitle>
                    <p className="text-center text-gray-500 text-sm mt-2">
                        Do you already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
                            Login Here
                        </Link>
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-indigo-900 font-semibold mb-2 flex flex-col">
                                    Personal Information
                                    <span className="h-[2px] w-20 bg-yellow-400 rounded"></span>
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter Your Full Name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter Your Email*</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="you@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <FormLabel>Enter Mobile Number*</FormLabel>
                                        <div className="flex mt-2.5">
                                            <FormField
                                                control={form.control}
                                                name="country"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-[120px] rounded-r-none">
                                                                    <SelectValue placeholder="Code" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="92">Pak (+92)</SelectItem>
                                                                <SelectItem value="91">Ind (+91)</SelectItem>
                                                                <SelectItem value="1">USA (+1)</SelectItem>
                                                                <SelectItem value="44">UK (+44)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="mobileNo"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormControl>
                                                            <Input placeholder="9876543210" className="rounded-l-none" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div>
                                <h3 className="text-indigo-900 font-semibold mb-2 flex flex-col">
                                    Account Information
                                    <span className="h-[2px] w-20 bg-yellow-400 rounded"></span>
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex-1">
                                                    <FormLabel>Username*</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Choose a username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                                <Button type="button" variant="link" className="mt-6 text-indigo-600 text-sm">
                                                    Check Availability
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password*</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password*</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="idType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID Type*</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select ID Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cnic">CNIC</SelectItem>
                                                    <SelectItem value="passport">Passport</SelectItem>
                                                    <SelectItem value="driver_license">Driver License</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="idNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID Number*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your ID number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Captcha */}
                            <div>
                                <h3 className="text-indigo-900 font-semibold mb-2">Prove You Are Human</h3>
                                <FormField
                                    control={form.control}
                                    name="captcha"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2 border rounded-md p-3">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel className="text-gray-700">I’m not a robot</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Terms */}
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="text-sm text-gray-600">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-indigo-600 hover:underline">
                                                Terms & Conditions
                                            </Link>
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Error Message */}
                            {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
