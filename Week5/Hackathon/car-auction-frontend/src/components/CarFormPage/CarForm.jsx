"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCreateCarMutation } from "@/redux/slices/cars/carApi"
import DynamicSelect from "../common/DynamicSelect"
import { CarSchema } from "@/lib/validations/CarSchema"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function CarForm() {
    const form = useForm({
        resolver: zodResolver(CarSchema),
        defaultValues: {
            vin: "",
            year: "",
            make: "",
            model: "",
            odometer: "",
            engineSize: "",
            paint: "",
            hasGccSpecs: "Yes",
            description: "",
            accidentHistory: "No",
            fullServiceHistory: "No",
            hasModified: "Completely Stock",
            photos: [],
        },
    })
    const user = useSelector(state => state.auth.user);
    const [createCar, { isLoading }] = useCreateCarMutation()
    const router = useRouter()

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files)
        const currentPhotos = form.getValues('photos') || []

        if (files.length + currentPhotos.length > 6) {
            alert("You must upload exactly 6 photos.")
            return
        }

        const newPhotos = [...currentPhotos, ...files]
        if (newPhotos.length > 6) {
            form.setValue('photos', newPhotos.slice(0, 6))
        } else {
            form.setValue('photos', newPhotos)
        }

        // Trigger validation for the photos field
        form.trigger('photos')
    }

    const onSubmit = async (values) => {
        // Check if user is logged in
        if (!user?.id && !user?._id) {
            alert('Please log in to submit a car listing.');
            return;
        }

        const parsed = CarSchema.safeParse(values);
        if (!parsed.success) {
            console.log("❌ Zod validation errors:", parsed.error.format());
            return;
        }

        try {
            const formData = new FormData();
            
            Object.entries(parsed.data).forEach(([key, value]) => {
                if (key !== "photos") {
                    formData.append(key, value.toString());
                }
            });

            const userId = user.id || user._id;
            formData.append('owner', userId);

            // Add photos
            parsed.data.photos.forEach((file) => {
                formData.append("photos", file);
            });

            const result = await createCar(formData).unwrap();
            
            form.reset();
            
            alert("Car details submitted successfully! Now let's set up your auction.");
            const carId = result._id
            // Navigate to auction form with car ID
            router.push(`/auction-form/${carId}`);
            
        } catch (err) {
            console.error("Sell Car Error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <div className="bg-[#DBE8FF] rounded-sm p-6">
                <h2 className="font-bold text-2xl mb-1">Car Details</h2>
                <div className="h-1 w-28 bg-yellow-400 rounded mb-4"></div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        console.log("❌ Validation Errors:", errors);
                    })} className="space-y-4">
                        {/* Row 1: VIN and Year */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="vin"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-sm font-medium text-gray-800">VIN*</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full bg-white border border-gray-300 rounded h-9"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DynamicSelect
                                form={form}
                                name="year"
                                label="Year*"
                                fieldKey="year"
                            />
                        </div>

                        {/* Row 2: Make and Model */}
                        <div className="grid grid-cols-2 gap-4">
                            <DynamicSelect
                                form={form}
                                name="make"
                                label="make*"
                                fieldKey="make"
                            />
                            <DynamicSelect
                                form={form}
                                name="model"
                                label="model*"
                                fieldKey="model"
                            />
                        </div>

                        {/* Row 3: Mileage and Engine Size */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="odometer"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-sm font-medium text-gray-800">Mileage (in miles)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="10000 m"
                                                className="bg-white border border-gray-300 rounded h-9"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DynamicSelect
                                form={form}
                                name="engineSize"
                                label="Engine Size*"
                                fieldKey="engineSize"
                            />

                        </div>

                        {/* Row 4: Paint and GCC Specs */}
                        <div className="grid grid-cols-2 gap-4">
                            <DynamicSelect
                                form={form}
                                name="paint"
                                label="Paint*"
                                fieldKey="paint"
                            />

                            <DynamicSelect
                                form={form}
                                name="hasGccSpecs"
                                label="Has GCC Specs"
                                fieldKey="hasGccSpecs"
                            />

                        </div>

                        {/* Noteworthy options/features */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-800">Noteworthy options/features</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="bg-white border border-gray-300 rounded min-h-[80px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Row 5: Accident History and Service History */}
                        <div className="grid grid-cols-2 gap-4">
                            <DynamicSelect
                                form={form}
                                name="accidentHistory"
                                label="Accident History"
                                fieldKey="accidentHistory"
                            />


                            <DynamicSelect
                                form={form}
                                name="fullServiceHistory"
                                label="Full Service History"
                                fieldKey="fullServiceHistory"
                            />

                        </div>


                        {/* Row 6 Modified */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Modified Radio Buttons */}
                            <FormField
                                control={form.control}
                                name="hasModified"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-800">Has the car been modified?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="flex space-x-6 mt-2"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Completely Stock" id="Completely Stock" className="border-gray-400" />
                                                    <label htmlFor="Completely Stock" className="text-sm text-gray-700">Completely stock</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="modified" id="modified" className="border-gray-400" />
                                                    <label htmlFor="modified" className="text-sm text-gray-700">Modified</label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Max Bid */}
                            <FormField
                                control={form.control}
                                name="maxBid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-800">Max Bid*</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="$"
                                                className="bg-white border border-gray-300 rounded h-9"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Upload Photos */}
                        <div>
                            <FormLabel className="text-sm font-medium text-gray-800">Upload Photos (6)</FormLabel>
                            <div className="">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                    id="photo-upload"
                                />

                                <Button type="button"
                                    variant="outline"
                                    className="bg-white cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 h-9 px-4"
                                    onClick={() => document.getElementById("photo-upload").click()} >
                                    Add Photos
                                </Button>

                                {form.formState.errors.photos && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {form.formState.errors.photos.message}
                                    </p>
                                )}
                                {/* Preview selected photos */}
                                {/* Preview selected photos */}
                                {form.watch('photos')?.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {form.watch('photos').map((file, idx) => (
                                            <div key={idx} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`photo-${idx}`}
                                                    className="w-full h-24 object-cover rounded border"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="cursor-pointer font-bold px-12 bg-blue-800 hover:bg-blue-900 text-white h-11 rounded"
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
