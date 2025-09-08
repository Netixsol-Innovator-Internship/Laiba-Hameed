"use client"

import { useState } from "react"
import Image from "next/image"

export default function ImageGallery({ images = [], status }) {
    const [selectedImage, setSelectedImage] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[480px] flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">No images available</p>
            </div>
        )
    }

    return (
        <div className="w-full p-4">
            <div className="flex gap-3">
                {/* Main Image */}
                <div className="relative flex-1 max-w-[60%]">
                    {/* Status Badge */}
                    {status && (
                        <div className="absolute top-4 left-4 z-10">
                            <span
                                className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5
                                    ${status === "Live" ? "bg-red-600 text-white" : ""}
                                    ${status === "Ended" ? "bg-gray-500 text-white" : ""}
                                    ${status === "Sold Out" ? "bg-green-600 text-white" : ""}
                                `}
                            >
                                {status}
                                {status === "Live" && (
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                )}
                            </span>
                        </div>
                    )}

                    <div className="relative w-full h-[480px] rounded-lg overflow-hidden">
                        <Image
                            src={images[selectedImage]}
                            alt="Car Main View"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="w-[40%] grid grid-cols-2 gap-3 h-[480px]">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] ${selectedImage === idx
                                ? "ring-2 ring-blue-500 shadow-lg"
                                : "hover:shadow-md"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Car View ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
