"use client";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function YourInfoForm() {
    const user = useSelector(state => state.auth.user);

    // Extract first and last name from fullName
    const getNameParts = (fullName) => {
        if (!fullName) return { firstName: "", lastName: "" };
        const parts = fullName.trim().split(" ");
        const firstName = parts[0] || "";
        const lastName = parts.slice(1).join(" ") || "";
        return { firstName, lastName };
    };

    const { firstName, lastName } = getNameParts(user?.fullName);

    const form = useForm({
        defaultValues: {
            dealerType: "private", // default to private party
            firstName: firstName,
            lastName: lastName,
            email: user?.email || "",
            phone: user?.mobileNo || "",
        },
    });

    useEffect(() => {
        if (user) {
            const { firstName, lastName } = getNameParts(user.fullName);
            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", user.email);
            form.setValue("phone", user.mobileNo);
        }
    }, [user, form]);

    return (
        <div className="container mx-auto max-w-2xl pt-12">
            <div className="p-6 bg-[#DBE8FF] rounded-sm">
                <h2 className="font-bold text-2xl mb-1">Your Info</h2>
                <div className="h-1 w-24 bg-yellow-400 rounded mb-4"></div>

                <Form {...form}>
                    <form className="space-y-4">
                        {/* Dealer or Private party */}
                        <FormField
                            control={form.control}
                            name="dealerType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-800">
                                        Dealer or Private party?
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex space-x-6 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="dealer"
                                                    id="dealer"
                                                    className="border-gray-400"
                                                />
                                                <label htmlFor="dealer" className="text-sm text-gray-700">
                                                    Dealer
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="private"
                                                    id="private"
                                                    className="border-gray-400"
                                                />
                                                <label htmlFor="private" className="text-sm text-gray-700">
                                                    Private party
                                                </label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* First & Last Name - Read Only */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name*</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-100 border border-gray-300 rounded h-9 cursor-not-allowed"
                                                placeholder="First name"
                                                {...field}
                                                readOnly
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name*</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-100 border border-gray-300 rounded h-9 cursor-not-allowed"
                                                placeholder="Last name"
                                                {...field}
                                                readOnly
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email and Phone - Read Only */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email*</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-100 border border-gray-300 rounded h-9 cursor-not-allowed"
                                                placeholder="example@mail.com"
                                                {...field}
                                                readOnly
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number*</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-100 border border-gray-300 rounded h-9 cursor-not-allowed"
                                                placeholder="+923001234567"
                                                {...field}
                                                readOnly
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Info Message */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                                Your personal information is automatically filled from your account details.
                                To update this information, please go to your profile settings.
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}