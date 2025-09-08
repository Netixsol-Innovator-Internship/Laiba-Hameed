"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { loginSchema } from "@/lib/validations/loginSchema"
import { useLoginMutation } from "@/redux/slices/auth/authApi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    })

    const router = useRouter()
    const [serverError, setServerError] = useState(null)

    const [login, { isLoading }] = useLoginMutation()

    const onSubmit = async (values) => {
        setServerError(null)
        try {
            await login(values).unwrap()
            router.push("/profile") // ✅ redirect after successful login
        } catch (err) {
            setServerError(err?.data?.message || "Invalid email or password")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            {/* Tabs for Register / Login */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-white rounded-full p-1 shadow-sm border">
                    <Link href="/register">
                        <button className="px-6 py-2 rounded-full text-gray-600 font-medium hover:text-gray-900">
                            Register
                        </button>
                    </Link>
                    <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium">
                        Login
                    </button>
                </div>
            </div>

            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                        Login
                    </CardTitle>
                    <p className="text-center text-gray-500 text-sm mt-2">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Register Here
                        </a>
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Remember me + Forgot password */}
                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="remember"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm text-gray-600">
                                                Remember Me
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Error Message */}
                            {serverError && (
                                <p className="text-red-500 text-sm">{serverError}</p>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
