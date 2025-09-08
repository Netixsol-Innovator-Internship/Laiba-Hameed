"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

export default function FilterSidebar() {
    const [priceRange, setPriceRange] = useState([30000, 50000])

    return (
        <Card className="bg-[#2E3D83] text-white border-0 sticky top-8 rounded-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-white text-lg">
                    <Filter className="w-5 h-5" />
                    <span>Filter By</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Car Type Filter */}
                <Select>
                    <SelectTrigger className="w-full bg-white text-black">
                        <SelectValue placeholder="Any Car Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                    </SelectContent>
                </Select>

                {/* Color Filter */}
                <Select>
                    <SelectTrigger className="w-full bg-white rounded-xs text-black">
                        <SelectValue placeholder="Any Color" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                </Select>

                {/* Makes Filter */}
                <Select>
                    <SelectTrigger className="w-full bg-white rounded-xs text-black">
                        <SelectValue placeholder="Any Makes" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="mercedes">Mercedes</SelectItem>
                    </SelectContent>
                </Select>

                {/* Car Model Filter */}
                <Select>
                    <SelectTrigger className="w-full bg-white rounded-xs text-black">
                        <SelectValue placeholder="Any Car Model" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="civic">Civic</SelectItem>
                        <SelectItem value="camry">Camry</SelectItem>
                        <SelectItem value="f150">F-150</SelectItem>
                        <SelectItem value="x3">X3</SelectItem>
                        <SelectItem value="accord">Accord</SelectItem>
                    </SelectContent>
                </Select>

                {/* Style Filter */}
                <Select>
                    <SelectTrigger className="w-full bg-white rounded-xs text-black">
                        <SelectValue placeholder="Any Style" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                </Select>

                {/* Price Range Slider */}
                <div className="pt-2">
                    <div className="mb-6">
                        <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={100000}
                            step={1000}
                            className="mb-4 text-[#F4C23D]"
                        />
                    </div>

                    <Button className="w-full text-lg bg-[#F4C23D] hover:bg-yellow-600 text-black font-semibold py-6 rounded-sm cursor-pointer">
                        Filter
                    </Button>

                    <p className="text-center text-sm mt-3 text-indigo-200 font-medium">
                        Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
