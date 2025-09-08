"use client"

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FIELD_OPTIONS } from "@/constants/constants"

export default function DynamicSelect({ form, name, label, fieldKey }) {
    const options = FIELD_OPTIONS[fieldKey] || []

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className="text-sm font-medium text-gray-800">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full bg-white border border-gray-300 rounded h-9">
                                <SelectValue placeholder={`Select`} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((opt, idx) => (
                                    <SelectItem key={idx} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
