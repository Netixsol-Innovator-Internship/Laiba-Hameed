import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react'

export default function Hero() {
    return (
        <section className="min-h-screen flex items-end relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Background Car Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: "url('/assets/hero-img.jpg')"
                }}
            ></div>

            <div className="container mx-auto px-16 relative z-10 h-full">
                <div className="flex flex-col w-full">
                    <div className="max-w-md">
                        <h4 className='font-bold p-3.5 text-[#2E3D83] rounded-sm w-fit bg-[#BBD0F6]'>WELCOME TO AUCTION</h4>
                        <h1 className="text-7xl Josefin-Sans my-4 leading-tight">
                            Find Your Dream Car
                        </h1>
                        <p className="mb-8 text-[#C0C0C0]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus elementum cursus tincidunt sagittis elementum suspendisse
                            velit arcu.
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className='w-full flex items-center justify-center'>
                        <div className="bg-white rounded-sm shadow-xl w-fit p-2">
                        <div className="flex items-end gap-6">
                            {/* Make */}
                            <Select>
                                <SelectTrigger className="h-12 shadow-2xl w-28 border-none rounded-sm shadow-gray-500 text-gray-900">
                                    <SelectValue placeholder="Make" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="audi">Audi</SelectItem>
                                    <SelectItem value="bmw">BMW</SelectItem>
                                    <SelectItem value="mercedes">Mercedes</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Model */}
                            <Select>
                                <SelectTrigger className="h-12 shadow-2xl w-28 border-none rounded-sm shadow-gray-500 text-gray-900">
                                    <SelectValue placeholder="Model" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a4">A4</SelectItem>
                                    <SelectItem value="a6">A6</SelectItem>
                                    <SelectItem value="q7">Q7</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Year */}
                            <Select>
                                <SelectTrigger className="h-12 shadow-2xl w-28 border-none rounded-sm shadow-gray-500 text-gray-900">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2022">2022</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Price */}
                            <Select>
                                <SelectTrigger className="h-12 shadow-2xl w-28 border-none rounded-sm shadow-gray-500 text-gray-900">
                                    <SelectValue placeholder="Price" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="under-20k">Under $20k</SelectItem>
                                    <SelectItem value="20-40k">$20k – $40k</SelectItem>
                                    <SelectItem value="40-60k">$40k – $60k</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                                <Input
                                    placeholder="Search"
                                    className="h-12 pl-10 rounded-sm w-[353px] bg-[#1E2A78] hover:bg-[#162060] text-white"
                                />
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
