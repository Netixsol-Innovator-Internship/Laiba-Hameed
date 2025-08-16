import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { filters } from "../../constants/gernal"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [enabled, setEnabled] = useState(false)

    return (
        <div className=" hidden md:flex flex-col">
            {/* filters */}
            <div className="font-montserrat">
                {/* Header with toggle */}
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className="text-base font-medium uppercase w-[216px]">
                        Collections <span className="text-[#C3B212]">(1)</span>
                    </p>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>

                {/*  Options */}
                <div
                    className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="mt-2">
                        {filters.map((filter, index) => (
                            <label
                                key={index}
                                className="flex items-center gap-2 my-2"
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black bg-transparent border-2 border-black rounded focus:ring-0"
                                />
                                <span className="text-sm">{filter}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="border-b border-[#A0A0A0] mx-6 my-3"></div>
            </div>
            {/* organic toggle */}
            <div className="flex items-center">
                <p className="text-base font-medium uppercase">
                    organic
                </p>
                <button
                    onClick={() => setEnabled(!enabled)}
                    className={`w-8 h-4 mx-3 cursor-pointer flex items-center rounded-full border p-0.5 transition-colors duration-300 ${enabled ? "bg-[#282828]" : "bg-transparent"
                        }`}
                >
                    <div
                        className={`w-3 h-3 rounded-full shadow transform transition-transform duration-300 ${enabled ? "translate-x-4 bg-white" : "translate-x-0 bg-[#282828] "}`}
                    />
                </button>

            </div>
        </div>
    )
}

export default Sidebar
